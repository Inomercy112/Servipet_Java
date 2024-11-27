package com.servipet.backend.Estado.Repositorio;

import com.servipet.backend.Estado.Modelo.Estado;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepositorioEstado extends JpaRepository<Estado, Integer> {
    Estado findById(int id);
}
