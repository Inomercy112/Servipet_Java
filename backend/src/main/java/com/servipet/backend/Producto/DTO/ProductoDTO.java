package com.servipet.backend.Producto.DTO;

import com.servipet.backend.Categoria.Modelo.Categoria;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jetbrains.annotations.NotNull;

import java.util.Base64;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class ProductoDTO {

    private int id;

    private String nombreProductoDto;
    private String descripcionProductoDto;
    private Integer cantidadProductoDto;
    private Integer precioProductoDto;

    private byte[] imagenProductoDto;
    private List<Categoria> categoriasDto;

    public void setImagenProductoDto(String imagenProductoDto) {
        this.imagenProductoDto = Base64.getDecoder().decode(imagenProductoDto);
    }



}
