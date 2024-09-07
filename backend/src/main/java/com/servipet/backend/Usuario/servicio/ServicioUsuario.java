package com.servipet.backend.Usuario.servicio;

import com.servipet.backend.Usuario.Repositorio.RepositorioUsuario;
import com.servipet.backend.Usuario.clase.ClaseUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class ServicioUsuario {
    @Autowired
    private RepositorioUsuario usuarioRepositorio;


    public  ClaseUsuario guardarUsuario(ClaseUsuario claseUsuario){



        return  usuarioRepositorio.save(claseUsuario);
    }
    public List<ClaseUsuario> consultarUsuario(){

        return usuarioRepositorio.findAll();
    }
    public ClaseUsuario actualizarUsuario(ClaseUsuario claseUsuario){
        return  usuarioRepositorio.save(claseUsuario);
    }
    public ClaseUsuario desactivarUsuario(ClaseUsuario claseUsuario){
        claseUsuario.setEstado(2);
        return usuarioRepositorio.save(claseUsuario);
    }



}
