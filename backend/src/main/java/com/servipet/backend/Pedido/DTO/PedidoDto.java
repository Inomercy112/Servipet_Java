package com.servipet.backend.Pedido.DTO;

import lombok.Data;

import java.sql.Time;
import java.util.Date;
import java.util.List;


@Data
public class PedidoDto {
    private String direccionDto;
    private Time horaCompraDto;
    private Date diaCompraDto;
    private String quienCompraDto;
    private String quienVendeDto;
    private MetodoentregaDto metodoEntregaDto;
    private EstadoEntregaDto estadoEntregaDto;
    private List<DetallesPedidoDto> productosDto;

    @Data
    public static class DetallesPedidoDto {
        private String idDto;
        private Integer cantidadProductoDto;
        private Double precioActualDto;
    }
    @Data
    public static class EstadoEntregaDto {
        private Integer idDto;
        private String nombreEstadoDto;
    }
    @Data
    public static class MetodoentregaDto {
        private Integer idDto;
        private String nombreMetodoDto;
    }


}
