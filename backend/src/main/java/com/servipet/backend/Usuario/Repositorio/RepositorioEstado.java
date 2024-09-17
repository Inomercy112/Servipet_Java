package com.servipet.backend.Usuario.Repositorio;

import com.servipet.backend.Usuario.clase.Estado;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepositorioEstado extends JpaRepository<Estado, Integer> {
    Estado findById(int id);
}
