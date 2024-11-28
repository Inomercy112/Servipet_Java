package com.servipet.backend.Producto.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Base64;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class ProductoDTO {

    private String idDto;
    private String nombreProductoDto;
    private String descripcionProductoDto;
    private Integer cantidadProductoDto;
    private Integer precioProductoDto;

    private String imagenProductoDto;
    private List<String> categoriasNombresDto;
    private Integer estadoProductoDto;



}
