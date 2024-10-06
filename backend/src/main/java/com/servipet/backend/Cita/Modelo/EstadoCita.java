package com.servipet.backend.Cita.Modelo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "estado_cita")
public class EstadoCita {
    @Id
    @Column(name = "id_estado_cita", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nombre_estado_cita", nullable = false, length = 30)
    private String nombreEstadoCita;

}