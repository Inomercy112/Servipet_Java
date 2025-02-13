package com.servipet.backend.Usuario.DTO;

import lombok.Data;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor

public class RespuestaLogin {
    private String NombreUsuario;
    private String token;
    private String rol;
    private String Id;
    private String Documento;



}
