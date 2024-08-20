package com.servipet.veterinaria.Usuario;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table (name = "estado")
@Data
@NoArgsConstructor
public class ClaseEstado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "id_estado")
    private byte idEstado;
    @Column (name = "nombre_estado")
    private String nombreEstado;
}
