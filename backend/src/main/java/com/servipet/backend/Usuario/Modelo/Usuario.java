package com.servipet.backend.Usuario.Modelo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
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

    private String horarioAtencion;

    private List<String> diasDisponibles;

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
}