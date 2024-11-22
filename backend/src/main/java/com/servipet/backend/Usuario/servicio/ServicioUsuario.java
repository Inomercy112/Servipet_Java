package com.servipet.backend.Usuario.servicio;

import com.servipet.backend.Usuario.Repositorio.RepositorioEstado;
import com.servipet.backend.Usuario.Repositorio.RepositorioUsuario;
import com.servipet.backend.Usuario.clase.Estado;
import com.servipet.backend.Usuario.clase.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;
import java.util.Optional;

@Service
public class ServicioUsuario {
    private final RepositorioUsuario usuarioRepositorio;

    private final RepositorioEstado estadoRepositorio;

    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Autowired
    public ServicioUsuario(RepositorioUsuario repositorio, RepositorioEstado repositorioEstado) {
        this.usuarioRepositorio = repositorio;
        this.estadoRepositorio = repositorioEstado;
    }


    public void guardarUsuario(Usuario usuario){
        String contrasenaEncriptada = bCryptPasswordEncoder.encode(usuario.getContrasenaUsuario());
        usuario.setContrasenaUsuario(contrasenaEncriptada);
        usuarioRepositorio.save(usuario);
    }

    public List<Usuario> consultarUsuario(){
        return usuarioRepositorio.findAll();
    }

    public Optional<Usuario> consultarUsuarioPorId(Integer id){
        return usuarioRepositorio.findById(id);
    }

    public void desactivarUsuario(Usuario usuario){
        Estado estado = estadoRepositorio.findById(2);
        usuario.setEstadoUsuario(estado);
        usuarioRepositorio.save(usuario);
    }
    public Optional<Usuario> login(String correo){
        return Optional.ofNullable(
         usuarioRepositorio.findByCorreoUsuario(correo)
        );
    }
    public Optional<Usuario> buscarPorNombre(String nombre){
        return Optional.ofNullable(
                usuarioRepositorio.findByNombreUsuario(nombre)
        );
    }

}
