package com.servipet.backend.Categoria.Controlador;

import com.servipet.backend.Categoria.Modelo.Categoria;
import com.servipet.backend.Categoria.Servicio.ServicioCategoria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

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
    public ResponseEntity< List<Categoria>> ConsultarCategoria() {
        try {
            List<Categoria> categoriaList = servicioCategoria.listarCategoria();
            return ResponseEntity.ok().body(categoriaList);

        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }

}
