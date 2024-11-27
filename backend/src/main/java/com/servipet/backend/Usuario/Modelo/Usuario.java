package com.servipet.backend.Usuario.Modelo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Getter
@Setter
@Document(collection = "usuario")
public class Usuario {
    @Id
    private String id;

    private String documentoUsuario;

    private String nombreUsuario;

    private String correoUsuario;

    private String contrasenaUsuario;

    private LocalDate fechaNacimiento;

    private String direccionUsuario;

    private String telefonoUsuario;

    private String rolUsuario;

    private int estadoUsuario;

}