package com.servipet.backend.Categoria.Servicio;

import com.servipet.backend.Categoria.Modelo.Categoria;
import com.servipet.backend.Categoria.Repositorio.RepositorioCategoria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
@Service
public class ServicioCategoria {
    private final RepositorioCategoria repositorioCategoria;
    @Autowired
    public ServicioCategoria(RepositorioCategoria repositorioCategoria) {
        this.repositorioCategoria = repositorioCategoria;
    }
    public List<Categoria> listarCategoria() {
        return repositorioCategoria.findAll();
    }
}
