package com.servipet.backend.Usuario.Repositorio;

import com.servipet.backend.Usuario.clase.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RepositorioUsuario extends JpaRepository<Usuario, Long> {

    Usuario findByCorreoUsuario(String correo);

    Usuario findByNombreUsuario(String nombre);

    Optional<Usuario> findById(Integer id);
}
