package com.servipet.backend.Categoria.Modelo;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;


@Getter
@Setter
@Document
public class Categoria {
    @Id
    private String id;
    private String nombreCategoria;


}