package com.servipet.backend.Respuesta.DTO;

import com.servipet.backend.Pregunta.DTO.PreguntasDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RespuestaDTO {
    private int idDto;
    private PreguntasDTO idPreguntaDto;
    private String idUsuarioDto;
    private String descripcionDto;
    private Date fechaCreacionDto;
    private Time horaCreacionDto;
}
