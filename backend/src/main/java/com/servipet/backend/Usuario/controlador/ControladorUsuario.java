package com.servipet.backend.Usuario.Controlador;
import com.servipet.backend.Usuario.Componentes.JwtUtil;
import com.servipet.backend.Usuario.DTO.UsuarioDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.servipet.backend.Usuario.Servicio.ServicioUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/usuario")
public class ControladorUsuario {
    private final ServicioUsuario servicioUsuario;
    private final JwtUtil jwtUtil;


    @Autowired
    public ControladorUsuario(ServicioUsuario servicioUsuario, JwtUtil jwtUtil) {
        this.servicioUsuario = servicioUsuario;
        this.jwtUtil = jwtUtil;
    }
    @PostMapping("/Registrar")
    public ResponseEntity<String>  registrarUsuario(@RequestBody UsuarioDTO usuarioDTO){
        try {
                servicioUsuario.guardarUsuario(usuarioDTO);
                return ResponseEntity.ok("Usuario Registrado");
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage()+ "error de servidor");
        }
    }
    @GetMapping("/Consultar")
    public ResponseEntity< List<UsuarioDTO>> consultarUsuario() {
        try {
            List<UsuarioDTO> usuarioDTOList = servicioUsuario.consultarUsuario();

            return ResponseEntity.ok(usuarioDTOList);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }
    @GetMapping("/Consultar/{nombre}")
    public ResponseEntity< Optional<UsuarioDTO>> DatosUsuario(@PathVariable String nombre){
        String nombreOriginal = nombre.replace("-", " ");
        try {
            Optional<UsuarioDTO> usuarioDTOOptional = servicioUsuario.buscarPorNombre(nombreOriginal);
            return ResponseEntity.ok(usuarioDTOOptional);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @PutMapping("Actualizar/{id}")
    public ResponseEntity<?> actualizarUsuario(@PathVariable String id, @RequestBody UsuarioDTO usuarioDTO){
        try {
            usuarioDTO.setIdDto(id);
            Optional<UsuarioDTO> usuarioDTOOptional = servicioUsuario.consultarUsuarioPorId(id);
            if(usuarioDTOOptional.isPresent()){
                servicioUsuario.actualizarUsuario(usuarioDTO);
                String nuevoToken = jwtUtil.generateToken(usuarioDTO.getNombreUsuarioDto());
                Map<String, String> response = new HashMap<>();
                response.put("token", nuevoToken);
                return ResponseEntity.ok(response);
            }else {
                return ResponseEntity.badRequest().body("Usuario no encontrado");
            }

        }catch (Exception e){
            return ResponseEntity.badRequest().body("Error al actualizar usuario " + e.getMessage());
        }

    }
    @PutMapping("Desactivar/{id}")
    public ResponseEntity<String> desactivarUsuario(@PathVariable String id){
        try {
            Optional<UsuarioDTO> usuarioOptional = servicioUsuario.consultarUsuarioPorId(id);
            if(usuarioOptional.isPresent()){

                servicioUsuario.desactivarUsuario(usuarioOptional.get());
                return ResponseEntity.ok("Usuario desactivado");

            }else {
                return ResponseEntity.ok("Usuario no encontrado");
            }

        }catch (Exception e){
            return ResponseEntity.badRequest().body("Error al desactivar usuario" + e.getMessage());
        }


    }

}
