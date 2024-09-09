package com.servipet.backend.Usuario.servicio;

import com.servipet.backend.Usuario.Repositorio.RepositorioUsuario;
import com.servipet.backend.Usuario.clase.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class ServicioUsuario {
    @Autowired
    private RepositorioUsuario usuarioRepositorio;


    public Usuario guardarUsuario(Usuario usuario){
        return  usuarioRepositorio.save(usuario);
    }

    public List<Usuario> consultarUsuario(){
        return usuarioRepositorio.findAll();
    }

    public Usuario actualizarUsuario(Usuario usuario){
        return  usuarioRepositorio.save(usuario);
    }

    public Usuario desactivarUsuario(Usuario usuario){
        usuario.setEstado(2);
        return usuarioRepositorio.save(usuario);
    }
    public Optional<Usuario> login(String correo, String contrasena){
        return Optional.ofNullable(
         usuarioRepositorio.findByCorreoUsuarioAndContrasenaUsuario(correo,contrasena)
        );
    }
    public Optional<Usuario> buscarPorNombre(String nombre){
        return Optional.ofNullable(
                usuarioRepositorio.findByNombreUsuario(nombre)
        );
    }

}
