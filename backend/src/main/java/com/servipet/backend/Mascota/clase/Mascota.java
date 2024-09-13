package com.servipet.backend.Mascota.clase;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


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
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate fechaNacimiento;

    @Column (name = "dueno")
    private short dueno ;

    @Column(name ="antecedentes")
    private String antecedentes;

    @Column (name = "tipo")
    private Integer tipo;

    @Column (name = "tamaño")
    private Integer tamano;

    @Column(name = "raza")
    private String raza;

    @Column (name = "estado")
    private Integer estadoMascota;

    @Column(name = "peso_kg")
    private Integer peso;
}
