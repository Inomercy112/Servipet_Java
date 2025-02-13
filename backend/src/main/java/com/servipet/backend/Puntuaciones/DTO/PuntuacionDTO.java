package com.servipet.backend.Puntuaciones.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PuntuacionDTO {
    private String idDto;
    private String UsuarioPuntuacionDto;
    private String cantidadPuntuacionDto;
    private String comentarioPuntuacionDto;
}
