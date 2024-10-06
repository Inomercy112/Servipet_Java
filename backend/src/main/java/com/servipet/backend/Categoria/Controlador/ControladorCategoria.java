package com.servipet.backend.Categoria.Controlador;

import com.servipet.backend.Categoria.Modelo.Categoria;
import com.servipet.backend.Categoria.Servicio.ServicioCategoria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/categoria")
public class ControladorCategoria {
    private final ServicioCategoria servicioCategoria;
    @Autowired
    public ControladorCategoria(ServicioCategoria servicioCategoria) {
        this.servicioCategoria = servicioCategoria;
    }
    @GetMapping("/Consultar")
    public List<Categoria> ConsultarCategoria() {
        return servicioCategoria.listarCategoria();
    }

}
