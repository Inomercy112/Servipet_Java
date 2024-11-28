package com.servipet.backend.Mascota.Modelo;

import com.servipet.backend.Estado.Modelo.Estado;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "mascota")

public class Mascota {
    @Id
    @Column(name = "id_mascota", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    @Column(name = "nombre_mascota", nullable = false, length = 20)
    private String nombreMascota;

    @Column(name = "fecha_nacimiento_mascota", nullable = false)
    private LocalDate fechaNacimientoMascota;

    @Column(name = "peso_kg", nullable = false)
    private Integer pesoMascota;

    @Column(name = "raza", nullable = false)
    private String razaMascota;

    @Column(name = "antecedentes", nullable = false)
    private String antecedentesMascota;

    @Column(name = "dueno", nullable = false)
    private String duenoMascota;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "tipo", nullable = false)
    private com.servipet.backend.Mascota.Modelo.TipoDeMascota tipoMascota;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "`tamaño`", nullable = false)
    private com.servipet.backend.Mascota.Modelo.TamañoMascota tamañoMascota;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "estado", nullable = false)
    private Estado estadoMascota;

}