package com.servipet.backend.Usuario.controlador;
import com.servipet.backend.Usuario.clase.Usuario;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.servipet.backend.Usuario.servicio.ServicioUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/usuario")
public class ControladorUsuario {
    private final ServicioUsuario servicioUsuario;

    @Autowired
    public ControladorUsuario(ServicioUsuario servicioUsuario) {
        this.servicioUsuario = servicioUsuario;
    }


    @PostMapping("/Registrar")
    public ResponseEntity<String>  registrarUsuario(@RequestBody Usuario usuario){

        try {
            servicioUsuario.guardarUsuario(usuario);
            return ResponseEntity.ok("Usuario Registrado");

        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage()+ "error de servidor");
        }
    }
    @GetMapping("/consultar")
    public ResponseEntity< List<Usuario>> consultarUsuario() {
        try {
            List<Usuario> usuario = servicioUsuario.consultarUsuario();
            return ResponseEntity.ok(usuario);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }
    @GetMapping("/Consultar/{nombre}")
    public ResponseEntity< Optional<Usuario>> DatosUsuario(@PathVariable String nombre){
        try {
            Optional<Usuario> usuario = servicioUsuario.buscarPorNombre(nombre);
            return ResponseEntity.ok(usuario);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(null);
        }

    }

    @PutMapping("actualizar/{id}")
    public ResponseEntity<String> actualizarUsuario(@PathVariable Integer id, @RequestBody Usuario usuario){
        try {
            usuario.setId(id);
            servicioUsuario.actualizarUsuario(usuario);
            return ResponseEntity.ok("usuario Actualizado");


        }catch (Exception e){
            return ResponseEntity.badRequest().body("Error al actualizar usuario");
        }

    }
    @PutMapping("desactivar/{id}")
    public ResponseEntity<String> desactivarUsuario(@PathVariable Integer id){
        try {
            Optional<Usuario> usuarioOptional = servicioUsuario.consultarUsuarioPorId(id);
            if(usuarioOptional.isPresent()){
                Usuario usuario = usuarioOptional.get();
                servicioUsuario.desactivarUsuario(usuario);
                return ResponseEntity.ok("Usuario desactivado");

            }else {
                return ResponseEntity.ok("Usuario no encontrado");
            }

        }catch (Exception e){
            return ResponseEntity.badRequest().body("Error al desactivar usuario");
        }


    }





}
