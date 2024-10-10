package com.servipet.backend.Pedido.Controlador;

import com.servipet.backend.Pedido.Modelo.Pedido;
import com.servipet.backend.Pedido.Modelo.ProductoPedido;
import com.servipet.backend.Pedido.Servicio.ServicioPedido;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/pedido")
public class ControladorPedido {
    private final ServicioPedido servicioPedido;
    public ControladorPedido( ServicioPedido servicioPedido) {
        this.servicioPedido = servicioPedido;
    }
    @PostMapping("/Registrar")
    public ResponseEntity<?> RegistrarPedido(@RequestBody Pedido pedido) {
        servicioPedido.registrarPedido(pedido);
        return ResponseEntity.ok(pedido);
    }
    @GetMapping("/Consultar")
    public List<Pedido> ListarPedidos(){
        return servicioPedido.ListarPedidos();
    }
    @GetMapping("/Consultar/esp/{id}")
    public Optional<Pedido> ConsultarPedido(@PathVariable int id){
        return servicioPedido.BuscarPedido(id);
    }

}
