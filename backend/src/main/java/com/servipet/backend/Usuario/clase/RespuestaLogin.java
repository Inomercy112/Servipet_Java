package com.servipet.backend.Usuario.clase;

import lombok.Data;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor

public class RespuestaLogin {
    private String NombreUsuario;
    private String token;
    private Integer rol;


}
