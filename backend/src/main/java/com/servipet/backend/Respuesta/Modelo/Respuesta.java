package com.servipet.backend.Respuesta.Modelo;

import com.servipet.backend.Pregunta.Modelo.Pregunta;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Time;
import java.util.Date;


@Getter
@Setter
@Entity
@Table(name = "respuesta_pregunta")
public class Respuesta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_respuesta", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_pregunta", nullable = false)
    private Pregunta idPregunta;

    @Column(name = "id_usuario", nullable = false)
    private String idUsuario;

    @Column(name = "descripcion", nullable = false)
    private String descripcion;

    @Column(name = "fecha_ceacion", nullable = false)
    private Date fechaCreacion;

    @Column(name = "hora_creacion", nullable = false)
    private Time horaCreacion;

}