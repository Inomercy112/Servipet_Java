package com.servipet.backend.Usuario.Repositorio;

import com.servipet.backend.Usuario.Modelo.Usuario;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RepositorioUsuario extends MongoRepository<Usuario, String> {

    Usuario findByCorreoUsuario(String correo);

    Optional<Usuario> findByNombreUsuario(String nombre);

    @NotNull Optional<Usuario> findById(@NotNull String id);

    List< Usuario> findByEstadoUsuarioAndRolUsuario(int estado, String rol);
}
