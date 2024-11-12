package com.servipet.backend.Producto.Controlador;


import com.servipet.backend.Producto.DTO.ProductoDto;
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
    @GetMapping("/Consultar")
    public ResponseEntity< List<ProductoDto>>  listarProductos() {
        try {
             List<ProductoDto> productos  = servicioProducto.ListarProductos().stream()
                     .map(this::convertirAproductoDto)
                     .toList();
             return ResponseEntity.ok(productos);

        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @PostMapping("/Registrar")
    public ResponseEntity<?> registrarProducto(@RequestBody ProductoDto productoDto) {
        try {
            Producto producto = new Producto();
            producto.setId(productoDto.getId());
            GuardarProductoDto(productoDto, producto);

            servicioProducto.RegistrarProducto(producto);
            return ResponseEntity.ok("Producto Registrado correctamente");

        }catch (Exception e) {

            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
    @GetMapping("/Consultar/esp/{id}")
    public ResponseEntity< Optional<ProductoDto>> consultarProducto(@PathVariable int id) {
        try {
            Optional<ProductoDto> productoDtoOptional = servicioProducto.BuscarProducto(id)
                    .map(this::convertirAproductoDto);
            return ResponseEntity.ok(productoDtoOptional);


        }catch (Exception e){

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @PutMapping("/Actualizar/{id}")
    public ResponseEntity<String> actualizarProducto(@RequestBody ProductoDto productoDto, @PathVariable Integer id) {
        try {
            Producto producto = new Producto();
            producto.setId(id);
            GuardarProductoDto(productoDto, producto);

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
    private ProductoDto convertirAproductoDto(Producto producto) {
        ProductoDto productoDto = new ProductoDto();
        productoDto.setId(producto.getId());
        productoDto.setCantidadProductoDto(producto.getCantidadProducto());
        productoDto.setPrecioProductoDto(producto.getPrecioProducto());
        productoDto.setDescripcionProductoDto(producto.getDescripcionProducto());
        productoDto.setImagenProductoDto(producto.getImagenProducto());
        productoDto.setNombreProductoDto(producto.getNombreProducto());
        productoDto.setCategoriasDto(producto.getCategorias());
        return productoDto;
    }
    private void GuardarProductoDto(@RequestBody ProductoDto productoDto, Producto producto) {
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
