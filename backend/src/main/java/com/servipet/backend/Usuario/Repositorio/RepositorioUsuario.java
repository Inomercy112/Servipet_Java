package com.servipet.backend.Usuario.Repositorio;

import com.servipet.backend.Usuario.clase.ClaseUsuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorioUsuario extends JpaRepository<ClaseUsuario, Long> {

    ClaseUsuario findBycorreoUsuario(String CorreoUsuario);
}
