package com.servipet.backend.Usuario.controlador;
import com.servipet.backend.Usuario.clase.Usuario;
import org.springframework.http.ResponseEntity;
import com.servipet.backend.Usuario.servicio.ServicioUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/usuario")


public class ControladorUsuario {


    @Autowired
    public ControladorUsuario(ServicioUsuario servicioUsuario) {
        this.servicioUsuario = servicioUsuario;
    }

    private final ServicioUsuario servicioUsuario;
    @PostMapping("/Registrar")
    public ResponseEntity<String>  registrarUsuario(@RequestBody Usuario usuario){

        servicioUsuario.guardarUsuario(usuario);
        return ResponseEntity.ok("Usuario Registrado");
    }
    @GetMapping("/consultar")
    public List<Usuario> consultarUsuario() {
        return servicioUsuario.consultarUsuario();
    }
    @GetMapping("/Consultar/{nombre}")
    public Optional<Usuario> DatosUsuario(@PathVariable String nombre){

        return servicioUsuario.buscarPorNombre(nombre);

    }

    @PutMapping("actualizar/{id}")
    public ResponseEntity<String> actualizarUsuario(@PathVariable Integer id, @RequestBody Usuario usuario){
        usuario.setId(id);
        servicioUsuario.actualizarUsuario(usuario);
        return ResponseEntity.ok("usuario Actualizado");

    }
    @PutMapping("desactivar/{id}")
    public ResponseEntity<String> desactivarUsuario(@PathVariable Integer id){
        Optional<Usuario> usuarioOptional = servicioUsuario.consultarUsuarioPorId(id);
        if(usuarioOptional.isPresent()){
            Usuario usuario = usuarioOptional.get();
            servicioUsuario.desactivarUsuario(usuario);
            return ResponseEntity.ok("Usuario desactivado");

        }else {
            return ResponseEntity.ok("Usuario no encontrado");
        }

    }





}
