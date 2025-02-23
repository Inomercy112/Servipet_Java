package com.servipet.backend.Pregunta.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.util.Date;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class PreguntasDTO {
    private int idDto;
    private String idProductoDto;
    private String idUsuarioDto;
    private String descripcionDto;
    private Date fechaCreacionDto;
    private Time horaCreacionDto;

}
