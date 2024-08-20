package com.servipet.veterinaria.Usuario.servicio;

import com.servipet.veterinaria.Usuario.ClaseUsuario;
import com.servipet.veterinaria.Usuario.Repositorio.RepositorioUsuario;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class ServicioUsuario {
    @Autowired
    private RepositorioUsuario usuarioRepositorio;

    public ClaseUsuario guardarUsuario(ClaseUsuario claseUsuario){

        claseUsuario.setCorreoUsuario(claseUsuario.getCorreoUsuario());
        claseUsuario.setNombreUsuario(claseUsuario.getNombreUsuario());
        claseUsuario.setContrasenaUsuario(claseUsuario.getContrasenaUsuario());
        claseUsuario.setRol(claseUsuario.getRol());


        return  usuarioRepositorio.save(claseUsuario);
    }
    public List<ClaseUsuario> consultarUsuario(){

        return usuarioRepositorio.findAll();
    }
}
