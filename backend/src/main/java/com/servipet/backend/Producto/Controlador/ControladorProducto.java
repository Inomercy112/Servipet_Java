package com.servipet.backend.Producto.Controlador;

import com.servipet.backend.Producto.Modelo.Producto;
import com.servipet.backend.Producto.Servicio.ServicioProducto;
import org.springframework.beans.factory.annotation.Autowired;
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
    @GetMapping("/Consultar")
    public List<Producto> listarProductos() {
        return servicioProducto.ListarProductos();
    }
    @PostMapping("/Registrar")
    public void registrarProducto(@RequestBody Producto producto) {
        servicioProducto.RegistrarProducto(producto);
    }
    @GetMapping("/Consultar/esp/{id}")
    public Optional<Producto> consultarProducto(@PathVariable int id) {
        return servicioProducto.BuscarProducto(id);
    }
    @PutMapping("/Actualizar/{id}")
    public ResponseEntity<String> actualizarProducto(@RequestBody Producto producto, @PathVariable Integer id) {
        producto.setId(id);
        servicioProducto.ModificarProducto(producto);
        return ResponseEntity.ok("Actualizado exitosamente");
    }
    @PutMapping("/desactivar/{id}")
    public ResponseEntity<String> desactivarProducto(@PathVariable Integer id, Producto producto) {
        producto.setId(id);
        servicioProducto.desactivarProducto(producto);
        return ResponseEntity.ok("Desactivado exitosamente");

    }


}
