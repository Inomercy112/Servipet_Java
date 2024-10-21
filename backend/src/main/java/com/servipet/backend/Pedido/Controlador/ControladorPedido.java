package com.servipet.backend.Pedido.Controlador;

import com.servipet.backend.Pedido.DTO.PedidoDto;
import com.servipet.backend.Pedido.Modelo.Pedido;
import com.servipet.backend.Pedido.Servicio.ServicioPedido;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/pedido")
public class ControladorPedido {
    private final ServicioPedido servicioPedido;
    public ControladorPedido(ServicioPedido servicioPedido) {
        this.servicioPedido = servicioPedido;
    }
    @PostMapping("/Registrar")
    public ResponseEntity<String> crearPedido(@RequestBody PedidoDto pedidoDto) {
        Pedido pedido = servicioPedido.RegistrarPedido(pedidoDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("pedido creado correctamente");
    }
}
