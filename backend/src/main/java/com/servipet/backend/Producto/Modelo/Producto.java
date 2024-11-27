package com.servipet.backend.Producto.Modelo;

import com.servipet.backend.Categoria.Modelo.Categoria;


import com.servipet.backend.Estado.Modelo.Estado;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

import java.util.Base64;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "producto")
public class Producto {
    @Id
    @Column(name = "id_producto", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Lob
    @Column(name = "imagen_producto", nullable = false)
    private byte[] imagenProducto;

    @Column(name = "nombre_producto", nullable = false, length = 60)
    private String nombreProducto;

    @Column(name = "descripcion_producto", nullable = false)
    private String descripcionProducto;

    @Column(name = "precio_producto", nullable = false)
    private Integer precioProducto;

    @Column(name = "cantidad_producto", nullable = false)
    private Integer cantidadProducto;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "estado")
    private Estado estado;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "producto_categoria",
            joinColumns = @JoinColumn(name = "id_producto"),
            inverseJoinColumns = @JoinColumn(name = "id_categoria")
    )
    private List<Categoria> categorias = new ArrayList<>();

    public String getImagenProducto() {
        return Base64.getEncoder().encodeToString(imagenProducto);
    }


}
