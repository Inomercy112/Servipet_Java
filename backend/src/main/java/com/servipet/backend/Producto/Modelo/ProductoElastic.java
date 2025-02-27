package com.servipet.backend.Producto.Modelo;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.util.Base64;
import java.util.List;

@Getter
@Setter
@Document(indexName = "productos")
public class ProductoElastic {
    @Id
    private String id;

    @Field(type = FieldType.Text, analyzer = "standard", searchAnalyzer = "standard")
    private String nombreProducto;

    private byte[] imagenProducto;

    private String descripcionProducto;
    private String duenoProducto;
    private Integer precioProducto;
    private int cantidadProducto;
    private Integer estadoProducto;
    private List<String> categoriasNombres;

    public String getImagenProducto() {
        return (imagenProducto != null) ? Base64.getEncoder().encodeToString(imagenProducto) : null;

    }
}
