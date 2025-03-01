package com.servipet.backend.Producto.Servicio;

import com.servipet.backend.Producto.DTO.ProductoDTO;
import com.servipet.backend.Producto.Modelo.ProductoMongo;
import com.servipet.backend.Producto.Modelo.ProductoElastic;
import com.servipet.backend.Producto.Repositorio.RepositorioProducto;
import com.servipet.backend.Producto.Repositorio.RepositorioProductoElastic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ServicioProducto {

    private final RepositorioProducto repositorioProducto;
    private final RepositorioProductoElastic repositorioProductoElastic;

    @Autowired
    public ServicioProducto(RepositorioProducto repositorioProducto, RepositorioProductoElastic repositorioProductoElastic) {
        this.repositorioProducto = repositorioProducto;
        this.repositorioProductoElastic = repositorioProductoElastic;
    }

    public void guardarProducto(ProductoDTO productoDto) {
        ProductoMongo productoMongo = new ProductoMongo();
        convertirProductoEntity(productoDto, productoMongo);
        repositorioProducto.save(productoMongo);
        ProductoElastic productoElastic = convertirAProductoElastic(productoMongo);
        repositorioProductoElastic.save(productoElastic);
    }

    public void actualizarProducto(ProductoDTO productoDto) {
        Optional<ProductoMongo> productoOptional = repositorioProducto.findById(productoDto.getIdDto());

        if (productoOptional.isPresent()) {
            ProductoMongo productoMongo = productoOptional.get();
            convertirProductoEntity(productoDto, productoMongo);
            repositorioProducto.save(productoMongo);

            // También actualizar en Elasticsearch
            ProductoElastic productoElastic = convertirAProductoElastic(productoMongo);
            repositorioProductoElastic.save(productoElastic);
        } else {
            throw new RuntimeException("No se encontró el producto con ID: " + productoDto.getIdDto());
        }
    }

    public List<ProductoDTO> listarProductos() {
        return repositorioProducto.findByEstadoProductoIsNull().stream()
                .map(this::convertirAproductoDTO)
                .collect(Collectors.toList());
    }

    public List<ProductoDTO> listarProductosPorDueno(String id) {
        return repositorioProducto.findByEstadoProductoIsNullAndDuenoProducto(id).stream()
                .map(this::convertirAproductoDTO)
                .collect(Collectors.toList());
    }

    public Optional<ProductoDTO> buscarProducto(String id) {
        return repositorioProducto.findById(id).map(this::convertirAproductoDTO);
    }

    public List<ProductoDTO> buscarProductosPorCategoria(String categoria) {
        return repositorioProducto.findByEstadoProductoIsNullAndCategoriasNombresContaining(categoria).stream()
                .map(this::convertirAproductoDTO)
                .collect(Collectors.toList());
    }

    public List<ProductoDTO> buscarProductosPorNombre(String nombre) {
        return repositorioProductoElastic.findByNombreProductoWildcard(nombre).stream()
                .map(this::convertirAproductoDTODesdeElastic)
                .collect(Collectors.toList());
    }
    public Optional<ProductoDTO> buscarProductoId(String id) {
        return repositorioProducto.findById(id).map(this::convertirAproductoDTO);
    }

    public void desactivarProducto(String productoId) {
        Optional<ProductoMongo> productoOptional = repositorioProducto.findById(productoId);
        if (productoOptional.isPresent()) {
            ProductoMongo productoMongo = productoOptional.get();
            productoMongo.setEstadoProducto(2);
            repositorioProducto.save(productoMongo);

            // Eliminar de Elasticsearch
            repositorioProductoElastic.deleteById(productoId);
        } else {
            throw new RuntimeException("No se encontró el producto con ID: " + productoId);
        }
    }

    private ProductoDTO convertirAproductoDTO(ProductoMongo productoMongo) {
        ProductoDTO productoDto = new ProductoDTO();
        productoDto.setIdDto(productoMongo.getId());
        productoDto.setCantidadProductoDto(productoMongo.getCantidadProducto());
        productoDto.setPrecioProductoDto(productoMongo.getPrecioProducto());
        productoDto.setDescripcionProductoDto(productoMongo.getDescripcionProducto());
        productoDto.setImagenProductoDto(productoMongo.getImagenProducto());
        productoDto.setNombreProductoDto(productoMongo.getNombreProducto());
        productoDto.setCategoriasNombresDto(productoMongo.getCategoriasNombres());
        productoDto.setEstadoProductoDto(productoMongo.getEstadoProducto());
        productoDto.setDuenoProductoDto(productoMongo.getDuenoProducto());
        return productoDto;
    }

    private void convertirProductoEntity(ProductoDTO productoDto, ProductoMongo productoMongo) {
        productoMongo.setCantidadProducto(productoDto.getCantidadProductoDto());
        productoMongo.setPrecioProducto(productoDto.getPrecioProductoDto());
        productoMongo.setDescripcionProducto(productoDto.getDescripcionProductoDto());

        if (productoDto.getImagenProductoDto() != null && !productoDto.getImagenProductoDto().isEmpty()) {
            productoMongo.setImagenProducto(Base64.getDecoder().decode(productoDto.getImagenProductoDto()));
        } else {
            productoMongo.setImagenProducto(null);
        }

        productoMongo.setNombreProducto(productoDto.getNombreProductoDto());
        productoMongo.setCategoriasNombres(productoDto.getCategoriasNombresDto());
        productoMongo.setEstadoProducto(productoDto.getEstadoProductoDto());
        productoMongo.setDuenoProducto(productoDto.getDuenoProductoDto());
    }

    private ProductoElastic convertirAProductoElastic(ProductoMongo productoMongo) {
        ProductoElastic productoElastic = new ProductoElastic();
        productoElastic.setId(productoMongo.getId());
        productoElastic.setNombreProducto(productoMongo.getNombreProducto());
        productoElastic.setDescripcionProducto(productoMongo.getDescripcionProducto());

        if (productoMongo.getImagenProducto() != null && !productoMongo .getImagenProducto().isEmpty()) {
           productoElastic.setImagenProducto(Base64.getDecoder().decode(productoMongo.getImagenProducto()));
        } else {
            productoElastic.setImagenProducto(new byte[0]);
        }
        productoElastic.setDuenoProducto(productoMongo.getDuenoProducto());
        productoElastic.setPrecioProducto(productoMongo.getPrecioProducto());
        productoElastic.setCantidadProducto(productoMongo.getCantidadProducto());
        productoElastic.setEstadoProducto(productoMongo.getEstadoProducto());
        productoElastic.setCategoriasNombres(productoMongo.getCategoriasNombres());
        return productoElastic;
    }
    private ProductoDTO convertirAproductoDTODesdeElastic(ProductoElastic productoElastic) {
        ProductoDTO productoDto = new ProductoDTO();
        productoDto.setIdDto(productoElastic.getId());
        productoDto.setCantidadProductoDto(productoElastic.getCantidadProducto());
        productoDto.setPrecioProductoDto(productoElastic.getPrecioProducto());
        productoDto.setDescripcionProductoDto(productoElastic.getDescripcionProducto());
        productoDto.setNombreProductoDto(productoElastic.getNombreProducto());
        productoDto.setImagenProductoDto(productoElastic.getImagenProducto());
        productoDto.setCategoriasNombresDto(productoElastic.getCategoriasNombres());
        productoDto.setEstadoProductoDto(productoElastic.getEstadoProducto());
        productoDto.setDuenoProductoDto(productoElastic.getDuenoProducto());
        return productoDto;
    }

}
