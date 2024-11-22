package com.servipet.backend.Usuario.Repositorio;

import com.servipet.backend.Usuario.clase.Rol;
import org.springframework.data.jpa.repository.JpaRepository;



public interface RepositorioRol extends JpaRepository<Rol, Integer> {
    Rol findById(int id);
}
