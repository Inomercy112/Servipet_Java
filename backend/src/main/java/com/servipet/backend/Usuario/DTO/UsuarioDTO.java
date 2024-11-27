package com.servipet.backend.Usuario.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioDTO {
    private String idDto;
    private String nombreUsuarioDto;
    private String documentoUsuarioDto;
    private String correoUsuarioDto;
    private String contrasenaUsuarioDto;
    private LocalDate fechaNacimientoDto;
    private String telefonoUsuarioDto;
    private String direccionUsuarioDto;
    private String rolUsuarioDto;
    private int estadoUsuarioDto;
}
