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
    private Long documento;

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
    private Integer telefono;

    @Column(name = "rol", nullable = false)
    private Integer rol;

    @ManyToOne
    @JoinColumn (name = "estado_usuario")
    private  ClaseEstado estadoEntity;
}
