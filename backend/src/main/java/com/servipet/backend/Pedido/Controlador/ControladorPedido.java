package com.servipet.backend.Pedido.Controlador;

import com.servipet.backend.Pedido.DTO.PedidoDto;

import com.servipet.backend.Pedido.Modelo.ProductoPedido;
import com.servipet.backend.Pedido.Servicio.ServicioPedido;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pedido")
public class ControladorPedido {
    private final ServicioPedido servicioPedido;
    public ControladorPedido(ServicioPedido servicioPedido) {
        this.servicioPedido = servicioPedido;
    }
    @PostMapping("/Registrar")
    public ResponseEntity<String> crearPedido(@RequestBody PedidoDto pedidoDto) {
        try {
            servicioPedido.registrarPedido(pedidoDto);
            return ResponseEntity.status(HttpStatus.CREATED).body("pedido creado correctamente");

        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }


    }
    @GetMapping("/Historial/Usuario/{id}")
    public ResponseEntity<List <PedidoDto>> consultarPedido(@PathVariable String id) {
        try {
            List<PedidoDto> pedidoDtoList= servicioPedido.obtenerPedidosIdUsuario(id);
            return ResponseEntity.status(HttpStatus.OK).body(pedidoDtoList);
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @GetMapping("/Consultar/Veterinaria/{id}")
    public ResponseEntity<List <ProductoPedido>> consultarPedidoVeterinaria(@PathVariable String id) {
        try {
            List<ProductoPedido> pedidoDtoList = servicioPedido.obtenerPedidoIdVeterinario(id);
            return ResponseEntity.status(HttpStatus.OK).body(pedidoDtoList);
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
