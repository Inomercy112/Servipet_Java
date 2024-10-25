package com.servipet.backend.Mascota.clase;

import com.servipet.backend.Usuario.clase.Estado;
import com.servipet.backend.Usuario.clase.Usuario;
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
    private Integer pesoKg;

    @Column(name = "raza", nullable = false)
    private String raza;


    @Column(name = "antecedentes", nullable = false)
    private String antecedentes;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "dueno", nullable = false)
    private Usuario dueno;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "tipo", nullable = false)
    private com.servipet.backend.Mascota.clase.TipoDeMascota tipo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "`tamaño`", nullable = false)
    private com.servipet.backend.Mascota.clase.TamañoMascota tamaño;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "estado", nullable = false)
    private Estado estado;

}