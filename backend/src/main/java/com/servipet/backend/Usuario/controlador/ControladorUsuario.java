package com.servipet.backend.Usuario.controlador;
import com.servipet.backend.Usuario.clase.Usuario;
import org.springframework.http.ResponseEntity;
import com.servipet.backend.Usuario.servicio.ServicioUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/usuario")


public class ControladorUsuario {


    @Autowired
    private ServicioUsuario servicioUsuario;
    @PostMapping("/Registrar")
    public ResponseEntity<String>  registrarUsuario(@RequestBody Usuario usuario){
        servicioUsuario.guardarUsuario(usuario);
        return ResponseEntity.ok("Usuario Registrado");
    }
    @GetMapping("/consultar")
    public List<Usuario> consultarUsuario() {
        return servicioUsuario.consultarUsuario();
    }

    @PutMapping("actualizar/{id}")
    public ResponseEntity<String> actualizarUsuario(@PathVariable Integer id, @RequestBody Usuario usuario){
        usuario.setId(id);
        servicioUsuario.actualizarUsuario(usuario);
        return ResponseEntity.ok("usuario Actualizado");

    }
    @PutMapping("desactivar/{id}")
    public ResponseEntity<String> desactivarUsuario(@PathVariable Integer id, @RequestBody Usuario usuario){
        usuario.setId(id);
         servicioUsuario.desactivarUsuario(usuario);
         return ResponseEntity.ok("Usuario desactivado");
    }





}
