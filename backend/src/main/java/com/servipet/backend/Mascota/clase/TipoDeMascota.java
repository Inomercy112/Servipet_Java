package com.servipet.backend.Mascota.clase;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tipo_de_mascota")
public class TipoDeMascota {
    @Id
    @Column(name = "id_tipo", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Byte id;

    @Column(name = "nombre_tipo", nullable = false, length = 10)
    private String nombreTipo;

}