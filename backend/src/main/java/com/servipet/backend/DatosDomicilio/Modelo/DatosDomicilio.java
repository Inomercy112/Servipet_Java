package com.servipet.backend.DatosDomicilio.Modelo;

import jakarta.persistence.Id;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "DatosDomicilio")
public class DatosDomicilio {
    @Id
    private String id;
    private String duenoDomicilio;
    private String nombre;
    private String localidad;
    private String barrio;
    private String direccion;
    private String telefono;
    private String pisoDepartamento;
    private String casaOTrabajo;
    private String adicionales;
}
