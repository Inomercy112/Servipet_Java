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
@Table(name = "estado")
public class Estado {
    @Id
    @Column(name = "id_estado", nullable = false)
    private Integer id;

    @Column(name = "nombre_estado", nullable = false, length = 20)
    private String nombreEstado;

}