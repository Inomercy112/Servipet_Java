package com.servipet.backend.Mascota.clase;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name="tipo_de_mascota")
public class TipoMascota {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name = "id_tipo")
    private short idTipo;
    @Column(name = "Nombre_tipo")
    private String NombreTipo;
}
