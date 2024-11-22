package com.servipet.backend.Usuario.DTO;

import com.servipet.backend.Usuario.clase.Rol;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioDTO {
    private int idDto;
    private String nombreUsuarioDto;
    private String documentoUsuarioDto;
    private String correoUsuarioDto;
    private String contrasenaUsuarioDto;
    private LocalDate fechaNacimientoDto;
    private String telefonoUsuarioDto;
    private String direccionUsuarioDto;
    private Rol rolUsuarioDto;
}
