package com.servipet.backend.Producto.Servicio;
import com.servipet.backend.Producto.DTO.ProductoDTO;
import com.servipet.backend.Producto.Modelo.Producto;
import com.servipet.backend.Producto.Repositorio.RepositorioProducto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;
import java.util.Optional;
@Service
public class ServicioProducto {
    private final RepositorioProducto repositorioProducto;


    @Autowired
    public ServicioProducto(RepositorioProducto repositorioProducto) {
        this.repositorioProducto = repositorioProducto;
    }

    public void guardarProducto(ProductoDTO productoDto) {
            Producto producto = new Producto();
            convertirProductoEntity(productoDto, producto);
        repositorioProducto.save(producto);
    }
    public void actualizarProducto(ProductoDTO productoDto) {
        Optional<Producto> productoOptional = repositorioProducto.findById(productoDto.getIdDto());
        Producto producto ;
        if (productoOptional.isPresent()) {
            producto = productoOptional.get();
            convertirProductoEntity(productoDto, producto);
            repositorioProducto.save(producto);
        }else {
            throw new RuntimeException("No se encontro el producto");
        }

    }

    public List<ProductoDTO> listarProductos() {
        return repositorioProducto.findByEstadoProductoIsNull().stream().map(this :: convertirAproductoDTO).toList();
    }
    public List<ProductoDTO> listarProductosPorDueno(String id) {
        return repositorioProducto.findByEstadoProductoIsNullAndDuenoProducto(id).stream().map(this :: convertirAproductoDTO).toList();

    }
    public Optional<ProductoDTO> buscarProducto(String id) {
        return repositorioProducto.findById(id).map(this :: convertirAproductoDTO);
    }
    public void desactivarProducto(ProductoDTO productoDTO) {
        Optional<Producto> productoOptional = repositorioProducto.findById(productoDTO.getIdDto());
        if (productoOptional.isPresent()) {
            Producto producto = productoOptional.get();
            producto.setEstadoProducto(2);
            repositorioProducto.save(producto);
        }else {
            throw new RuntimeException("No se encontro el producto");
        }
    }
    private ProductoDTO convertirAproductoDTO(Producto producto) {
        ProductoDTO productoDto = new ProductoDTO();
        productoDto.setIdDto(producto.getId());
        productoDto.setCantidadProductoDto(producto.getCantidadProducto());
        productoDto.setPrecioProductoDto(producto.getPrecioProducto());
        productoDto.setDescripcionProductoDto(producto.getDescripcionProducto());
        productoDto.setImagenProductoDto(producto.getImagenProducto());
        productoDto.setNombreProductoDto(producto.getNombreProducto());
        productoDto.setCategoriasNombresDto(producto.getCategoriasNombres());
        productoDto.setEstadoProductoDto(producto.getEstadoProducto());
        productoDto.setDuenoProductoDto(producto.getDuenoProducto());
        return productoDto;
    }
    private void convertirProductoEntity(ProductoDTO productoDto, Producto producto) {
        producto.setCantidadProducto(productoDto.getCantidadProductoDto());
        producto.setPrecioProducto(productoDto.getPrecioProductoDto());
        producto.setDescripcionProducto(productoDto.getDescripcionProductoDto());
        producto.setImagenProducto(Base64.getDecoder().decode(productoDto.getImagenProductoDto()) );
        producto.setNombreProducto(productoDto.getNombreProductoDto());
        producto.setCategoriasNombres(productoDto.getCategoriasNombresDto());
        producto.setEstadoProducto(productoDto.getEstadoProductoDto());
        producto.setDuenoProducto(productoDto.getDuenoProductoDto());
    }




}
