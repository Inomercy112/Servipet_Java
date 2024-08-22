package com.servipet.veterinaria.Usuario.clase;

import jakarta.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table (name = "Rol")
@Data
@NoArgsConstructor
public class ClaseRol {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name = "id_rol")
    private byte idRol;
    @Column(name = "nombre_rol")
    private String nombreRol;
}
