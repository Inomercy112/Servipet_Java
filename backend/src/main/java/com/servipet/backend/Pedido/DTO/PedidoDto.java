package com.servipet.backend.Pedido.DTO;

import lombok.Data;

import java.sql.Time;
import java.util.Date;
import java.util.List;


@Data
public class PedidoDto {
    private double valorCompra;
    private String direccion;
    private Time horaCompra;
    private Date diaCompra;
    private String quienCompra;
    private byte metodoEntrega;
    private byte estadoEntrega;
    private List<DetallesPedidoDto> productos;

}
