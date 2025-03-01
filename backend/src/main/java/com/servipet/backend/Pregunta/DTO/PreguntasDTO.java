package com.servipet.backend.Pregunta.DTO;

import com.servipet.backend.Producto.DTO.ProductoDTO;
import com.servipet.backend.Respuesta.DTO.RespuestaDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.util.Date;
import java.util.List;

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
    private List<RespuestaDTO> respuestasDto;
    private ProductoDTO productoDto;

}
