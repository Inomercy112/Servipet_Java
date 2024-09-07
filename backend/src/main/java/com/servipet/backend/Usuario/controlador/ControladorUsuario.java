package com.servipet.backend.Usuario.controlador;
import com.servipet.backend.Usuario.clase.ClaseUsuario;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import com.servipet.backend.Usuario.servicio.ServicioUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/usuario")


public class ControladorUsuario {


    @Autowired
    private ServicioUsuario servicioUsuario;
    @PostMapping("/RegistroUsuario")
    public ResponseEntity<String>  registrarUsuario(@RequestBody ClaseUsuario claseUsuario){
        servicioUsuario.guardarUsuario(claseUsuario);
        return ResponseEntity.ok("Usuario Registrado");
    }
    @GetMapping("/consultar")
    public List<ClaseUsuario> consultarUsuario() {
        return servicioUsuario.consultarUsuario();
    }

    @PutMapping("actualizar/{id}")
    public ClaseUsuario actualizarUsuario(@PathVariable short id, @RequestBody ClaseUsuario claseUsuario){
        claseUsuario.setId(id);
        return servicioUsuario.actualizarUsuario(claseUsuario);

    }
    @PutMapping("desactivar/{id}")
    public ClaseUsuario desactivarUsuario(@PathVariable short id, @RequestBody ClaseUsuario claseUsuario){
        claseUsuario.setId(id);
        return servicioUsuario.desactivarUsuario(claseUsuario);
    }





}
