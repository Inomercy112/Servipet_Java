package com.servipet.backend.Usuario.Modelo;

import com.servipet.backend.Usuario.DTO.UsuarioDTO;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Base64;
import java.util.List;

@Getter
@Setter
@Document(collection = "usuario")
public class Usuario {
    @Id
    private String id;

    private byte[] imagenUsuario;

    private String nombreResponsable;

    private String correoContacto;

    private List <HorarioAtencion> horarioAtencion;

    private String documentoUsuario;

    private String nombreUsuario;

    private String correoUsuario;

    private String contrasenaUsuario;

    private LocalDate fechaNacimiento;

    private String direccionUsuario;

    private String telefonoUsuario;

    private String rolUsuario;

    private int estadoUsuario;

    public String getImagenUsuario() {
        if (imagenUsuario == null) {
            return null;
        }
        return Base64.getEncoder().encodeToString(imagenUsuario);
    }
@Data
    public static class HorarioAtencion{
        private String dia;
        private LocalTime apertura;
        private LocalTime cierre;
    private boolean cerrado;
    }
}