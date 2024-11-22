package com.servipet.backend.Producto.Controlador;


import com.servipet.backend.Producto.DTO.ProductoDTO;
import com.servipet.backend.Producto.Modelo.Producto;
import com.servipet.backend.Producto.Servicio.ServicioProducto;
import com.servipet.backend.Usuario.Repositorio.RepositorioEstado;
import com.servipet.backend.Usuario.clase.Estado;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/producto")
public class ControladorProducto {
    private final ServicioProducto servicioProducto;
    private final RepositorioEstado repositorioEstado;

    @Autowired
    public ControladorProducto(ServicioProducto servicioProducto, RepositorioEstado repositorioEstado) {
        this.servicioProducto = servicioProducto;
        this.repositorioEstado = repositorioEstado;

    }

    @PostMapping("/Registrar")
    public ResponseEntity<?> registrarProducto(@RequestBody ProductoDTO productoDto) {
        try {
            Producto producto = new Producto();
            producto.setId(productoDto.getId());
            GuardarProductoDTO(productoDto, producto);

            servicioProducto.RegistrarProducto(producto);
            return ResponseEntity.ok("Producto Registrado correctamente");

        }catch (Exception e) {

            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
    @GetMapping("/Consultar")
    public ResponseEntity< List<ProductoDTO>>  listarProductos() {
        try {
            List<ProductoDTO> productoDTOList  = servicioProducto.ListarProductos().stream()
                    .map(this::convertirAproductoDTO)
                    .toList();
            return ResponseEntity.ok(productoDTOList);

        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @GetMapping("/Consultar/esp/{id}")
    public ResponseEntity< Optional<ProductoDTO>> consultarProducto(@PathVariable int id) {
        try {
            Optional<ProductoDTO> productoDtoOptional = servicioProducto.BuscarProducto(id)
                    .map(this::convertirAproductoDTO);
            return ResponseEntity.ok(productoDtoOptional);


        }catch (Exception e){

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @PutMapping("/Actualizar/{id}")
    public ResponseEntity<String> actualizarProducto(@RequestBody ProductoDTO productoDto, @PathVariable Integer id) {
        try {
            Producto producto = new Producto();
            producto.setId(id);
            GuardarProductoDTO(productoDto, producto);
            servicioProducto.ModificarProducto(producto);
            return ResponseEntity.ok("Actualizado exitosamente");
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }


    @PutMapping("/Desactivar/{id}")
    public ResponseEntity<String> desactivarProducto(@PathVariable Integer id) {
        try {

            Optional<Producto> productoOptional = servicioProducto.BuscarProducto(id);
            if (productoOptional.isPresent()) {
                Producto producto = productoOptional.get();
                servicioProducto.desactivarProducto(producto);
                return ResponseEntity.ok("Desactivado exitosamente");
            }else {
                return ResponseEntity.badRequest().body("No se encontro el producto");
            }



        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    private ProductoDTO convertirAproductoDTO(Producto producto) {
        ProductoDTO productoDto = new ProductoDTO();
        productoDto.setId(producto.getId());
        productoDto.setCantidadProductoDto(producto.getCantidadProducto());
        productoDto.setPrecioProductoDto(producto.getPrecioProducto());
        productoDto.setDescripcionProductoDto(producto.getDescripcionProducto());
        productoDto.setImagenProductoDto(producto.getImagenProducto());
        productoDto.setNombreProductoDto(producto.getNombreProducto());
        productoDto.setCategoriasDto(producto.getCategorias());
        return productoDto;
    }
    private void GuardarProductoDTO(@RequestBody ProductoDTO productoDto, Producto producto) {
        producto.setCantidadProducto(productoDto.getCantidadProductoDto());
        producto.setPrecioProducto(productoDto.getPrecioProductoDto());
        producto.setDescripcionProducto(productoDto.getDescripcionProductoDto());
        producto.setImagenProducto(productoDto.getImagenProductoDto());
        producto.setNombreProducto(productoDto.getNombreProductoDto());
        producto.setCategorias(productoDto.getCategoriasDto());
        Estado estado = repositorioEstado.findById(1);
        producto.setEstado(estado);
    }



}
