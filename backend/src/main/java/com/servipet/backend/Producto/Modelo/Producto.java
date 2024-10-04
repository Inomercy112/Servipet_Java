package com.servipet.backend.Producto.Modelo;

import com.servipet.backend.Usuario.clase.Estado;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "producto")
public class Producto {
    @Id
    @Column(name = "id_producto", nullable = false)
    private Integer id;

    @Column(name = "imagen_producto", nullable = false)
    private byte[] imagenProducto;

    @Column(name = "nombre_producto", nullable = false, length = 60)
    private String nombreProducto;

    @Column(name = "descripcion_producto", nullable = false)
    private String descripcionProducto;

    @Column(name = "precio_producto", nullable = false)
    private Integer precioProducto;

    @Column(name = "cantidad_producto", nullable = false)
    private Byte cantidadProducto;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "estado", nullable = false)
    private Estado estado;

}