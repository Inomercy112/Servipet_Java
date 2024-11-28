package com.servipet.backend.Pedido.DTO;

import lombok.Data;

@Data
public class DetallesPedidoDto {
    private String productoId;
    private Integer cantidad;
    private Double precioActual;
}
