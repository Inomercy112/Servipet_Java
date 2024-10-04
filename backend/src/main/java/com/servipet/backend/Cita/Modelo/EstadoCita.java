package com.servipet.backend.Cita.Modelo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "estado_cita")
public class EstadoCita {
    @Id
    @Column(name = "id_estado_cita", nullable = false)
    private Integer id;

    @Column(name = "nombre_estado_cita", nullable = false, length = 30)
    private String nombreEstadoCita;

}