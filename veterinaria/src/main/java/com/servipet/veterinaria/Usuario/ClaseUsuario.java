package com.servipet.veterinaria.Usuario;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "usuario")
@Data
@NoArgsConstructor
public class ClaseUsuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "id_usuario")
    private short id ;
    @Column (name = "Documento",unique =true)
    private long documento;

    @Column (name = "nombre_usuario",nullable = false, length = 50)
    private String nombreUsuario;

    @Column (name = "correo_usuario", nullable = false,unique = true)
    private String correoUsuario;

    @Column (name = "contrasena_usuario",nullable = false)
    private String contrasenaUsuario;

    @Column (name = "fecha_nacimiento")
    private Date fechaNacimiento;

    @Column (name = "direccion")
    private String direccion;

    @Column (name = "telefono",length = 10)
    private int telefono;

    @Column (name = "rol", nullable = false)
    private byte rol;

    @Column (name = "estado", nullable = false)
    private byte estado;

    @ManyToOne
    @JoinColumn (name = "rol", insertable = false ,updatable = false)
    private ClaseRol rolEntity;

    @ManyToOne
    @JoinColumn (name = "estado", insertable = false, updatable = false)
    private  ClaseEstado estadoEntity;
}
