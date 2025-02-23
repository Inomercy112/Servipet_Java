package com.servipet.backend.Usuario.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioDTO {
    private String idDto;
    @NotBlank
    @Pattern(regexp = "^(?!([a-zA-Z0-9])\\1{2,}$).{6,20}$", message = "El nombre de usuario solo permite 2 caracteres seguidos")
    private String nombreUsuarioDto;
    @Size(min = 8, max = 20)
    private String documentoUsuarioDto;
    @NotBlank
    @Email
    private String correoUsuarioDto;
    @Size(min = 8, max = 20)
    private String contrasenaUsuarioDto;

    private LocalDate fechaNacimientoDto;
    @Pattern(regexp = "\\d{10}")
    private String telefonoUsuarioDto;
    @Size(min = 8, max = 50)
    private String direccionUsuarioDto;
    @NotBlank
    private String rolUsuarioDto;
    private int estadoUsuarioDto;
    private String imagenUsuarioDto;
    private List<String> diasDisponiblesDto;
    private String NombreResponsableDto;
    private String correoContactoDto;
    private String horarioAtencionDto;
}
