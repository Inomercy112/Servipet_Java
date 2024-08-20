package com.servipet.veterinaria.Usuario.Repositorio;

import com.servipet.veterinaria.Usuario.ClaseUsuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepositorioUsuario extends JpaRepository <ClaseUsuario, Long> {
}
