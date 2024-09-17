package com.servipet.backend.Usuario.clase;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "rol")
public class Rol {
    @Id
    @Column(name = "id_rol", nullable = false)
    private Integer id;

    @Column(name = "nombre_rol", nullable = false, length = 25)
    private String nombreRol;

}