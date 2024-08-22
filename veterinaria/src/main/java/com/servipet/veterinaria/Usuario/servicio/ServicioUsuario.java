package com.servipet.veterinaria.Usuario.servicio;

import com.servipet.veterinaria.Usuario.clase.ClaseUsuario;
import com.servipet.veterinaria.Usuario.Repositorio.RepositorioUsuario;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
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

    public UserDetails porNombre(String CorreoUsuario) throws Exception {
        ClaseUsuario claseUsuario = usuarioRepositorio.findBycorreoUsuario(CorreoUsuario);
        if (claseUsuario == null){
            throw new Exception("Usuario no registrado");
        }
        return new org.springframework.security.core.userdetails.User(claseUsuario.getCorreoUsuario(),claseUsuario.getContrasenaUsuario(), new ArrayList<>());
    }
}
