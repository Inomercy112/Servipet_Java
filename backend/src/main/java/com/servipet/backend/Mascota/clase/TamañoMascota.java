package com.servipet.backend.Mascota.clase;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "`tamaño_mascota`")
public class TamañoMascota {
    @Id
    @Column(name = "`id_tamaño`", nullable = false)
    private Byte id;

    @Column(name = "`nombre_tamaño`", nullable = false, length = 15)
    private String nombreTamaño;

}