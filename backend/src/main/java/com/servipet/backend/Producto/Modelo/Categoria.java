package com.servipet.backend.Producto.Modelo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "categoria")
public class Categoria {
    @Id
    @Column(name = "id_categoria", nullable = false)
    private Byte id;

    @Column(name = "nombre_categoria", nullable = false)
    private String nombreCategoria;

}