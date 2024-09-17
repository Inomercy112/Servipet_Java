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
@Table(name = "tipo_de_mascota")
public class TipoDeMascota {
    @Id
    @Column(name = "id_tipo", nullable = false)
    private Byte id;

    @Column(name = "nombre_tipo", nullable = false, length = 10)
    private String nombreTipo;

}