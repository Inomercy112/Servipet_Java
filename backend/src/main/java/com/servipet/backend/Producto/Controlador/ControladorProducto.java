package com.servipet.backend.Producto.Controlador;
import com.servipet.backend.Producto.DTO.ProductoDTO;
import com.servipet.backend.Producto.Servicio.ServicioProducto;
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

    @Autowired
    public ControladorProducto(ServicioProducto servicioProducto) {
        this.servicioProducto = servicioProducto;

    }
    @PostMapping("/Registrar")
    public ResponseEntity<String> registrarProducto(@RequestBody ProductoDTO productoDto) {
        try {
            servicioProducto.guardarProducto(productoDto);
            return ResponseEntity.ok("Producto Registrado correctamente");

        }catch (Exception e) {

            return ResponseEntity.badRequest().body("no se pudo registrar el producto " + e.getMessage());
        }
    }
    @GetMapping("/Consultar/{id}")
    public ResponseEntity< List<ProductoDTO>>  listarProductos(@PathVariable String id) {
        try {
            List<ProductoDTO> productoDTOList  = servicioProducto.listarProductosPorDueno(id);
            return ResponseEntity.ok(productoDTOList);

        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @GetMapping("/Consultar/esp/{id}")
    public ResponseEntity< Optional<ProductoDTO>> consultarProducto(@PathVariable String id) {
        try {

            Optional<ProductoDTO> productoDtoOptional = servicioProducto.buscarProducto(id);
            return ResponseEntity.ok(productoDtoOptional);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @PutMapping("/Actualizar/{id}")
    public ResponseEntity<String> actualizarProducto(@RequestBody ProductoDTO productoDto, @PathVariable String id) {
        try {
            productoDto.setIdDto(id);
            Optional<ProductoDTO> productoDtoOptional = servicioProducto.buscarProducto(id);
            if (productoDtoOptional.isPresent()) {
                servicioProducto.actualizarProducto(productoDto);
                return ResponseEntity.ok("Actualizado exitosamente");

            }else {
                return ResponseEntity.badRequest().body("No se encontro el producto");
            }

        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
    @PutMapping("/Desactivar/{id}")
    public ResponseEntity<String> desactivarProducto(@PathVariable String id) {
        try {

            Optional<ProductoDTO> productoOptional = servicioProducto.buscarProducto(id);
            if (productoOptional.isPresent()) {
                servicioProducto.desactivarProducto(productoOptional.get());
                return ResponseEntity.ok("Desactivado exitosamente");
            }else {
                return ResponseEntity.badRequest().body("No se encontro el producto");
            }



        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }




}
