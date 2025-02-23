package com.servipet.backend.Puntuaciones.Modelo;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Puntuacion")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Puntuacion {
    @Id
    public String Id;
    public String UsuarioPuntuacion;
    public String cantidadPuntuacion;
    public String ComentarioPuntuacion;
}
