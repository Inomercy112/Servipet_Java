package com.servipet.backend.Categoria.Repositorio;

import com.servipet.backend.Categoria.Modelo.Categoria;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface RepositorioCategoria extends MongoRepository<Categoria, String> {
}
