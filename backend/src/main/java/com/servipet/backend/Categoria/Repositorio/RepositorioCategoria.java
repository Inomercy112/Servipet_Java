package com.servipet.backend.Categoria.Repositorio;

import com.servipet.backend.Categoria.Modelo.Categoria;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RepositorioCategoria extends JpaRepository<Categoria, Integer> {
}
