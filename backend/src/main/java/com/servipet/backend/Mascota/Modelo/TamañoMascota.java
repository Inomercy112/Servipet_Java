package com.servipet.backend.Mascota.Modelo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "`tamaño_mascota`")
public class TamañoMascota {
    @Id
    @Column(name = "`id_tamaño`", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Byte id;

    @Column(name = "`nombre_tamaño`", nullable = false, length = 15)
    private String nombreTamaño;

}