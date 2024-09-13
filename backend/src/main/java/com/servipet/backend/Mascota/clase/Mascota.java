package com.servipet.backend.Mascota.clase;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@NoArgsConstructor
@Data
@Table(name = "mascota")
public class Mascota {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY )
    @Column (name = "id_mascota")
    private int idMascota;

    @Column (name = "nombre_mascota")
    private String nombreMascota;

    @Column (name = "fecha_nacimiento_mascota")
    private Date fechaNacimientoMascota;

    @Column (name = "dueno")
    private short dueno ;

    @Column(name ="antecendentes")
    private String antecedentes;

    @Column (name = "tipo")
    private Integer tipo;

    @Column (name = "tamaño")
    private Integer tamano;

    @Column(name = "raza")
    private String raza;

    @Column (name = "estado")
    private Integer estado;
}
