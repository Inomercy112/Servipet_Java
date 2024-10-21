package com.servipet.backend.Pedido.DTO;

import lombok.Data;

import java.util.List;

@Data
public class PedidoDto {
    private double valorCompra;
    private int quienCompra;
    private byte metodoEntrega;
    private byte estadoEntrega;
    private List<DetallesPedidoDto> productos;

}
