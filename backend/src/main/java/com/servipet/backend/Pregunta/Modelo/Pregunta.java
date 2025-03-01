package com.servipet.backend.Pregunta.Modelo;

import com.servipet.backend.Respuesta.Modelo.Respuesta;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.sql.Time;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Preguntas_producto")
public class Pregunta {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    @Column(name = "id_pregunta", nullable = false)
    private int id;

    @Column(name = "id_producto", nullable = false)
    private String idProducto;

    @Column(name = "id_usuario", nullable = false)
    private String idUsuario;

    @Column(name = "descripcion", nullable = false)
    private String descripcion;

    @Column(name = "fecha_creacion", nullable = false)
    private Date fechaCreacion;

    @Column(name = "hora_creacion", nullable = false)
    private Time horaCreacion;

    @OneToMany(mappedBy = "idPregunta", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Respuesta> respuestas;

}
