package com.servipet.backend.Producto.Modelo;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Getter
@Setter
@Document( collection = "producto")
public class Producto {
    @Id
    private String id;
    private byte[] imagenProducto;

    private String nombreProducto;

    private String descripcionProducto;

    private String duenoProducto;

    private Integer precioProducto;

    private int cantidadProducto;

    private Integer estadoProducto;

    private List<String> categoriasNombres = new ArrayList<>();

    public String getImagenProducto() {
        return Base64.getEncoder().encodeToString(imagenProducto);
    }


}
