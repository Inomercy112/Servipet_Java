package com.servipet.backend.Usuario.Repositorio;

import com.servipet.backend.Usuario.clase.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorioUsuario extends JpaRepository<Usuario, Long> {

    Usuario findByCorreoUsuarioAndContrasenaUsuario(String correo, String contrasena);


}
