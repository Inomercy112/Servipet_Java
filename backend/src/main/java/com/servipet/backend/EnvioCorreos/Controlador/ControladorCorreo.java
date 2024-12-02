package com.servipet.backend.EnvioCorreos.Controlador;

import com.servipet.backend.EnvioCorreos.Servicio.ServicioEmail;
import com.servipet.backend.Usuario.Componentes.JwtUtil;
import com.servipet.backend.Usuario.DTO.UsuarioDTO;
import com.servipet.backend.Usuario.Servicio.ServicioUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/mail")
public class ControladorCorreo {

    private final ServicioEmail servicioEmail;
    private final ServicioUsuario servicioUsuario;
    private final JwtUtil jwtUtil;

    @Autowired
    public ControladorCorreo(ServicioEmail servicioEmail, ServicioUsuario servicioUsuario, JwtUtil jwtUtil) {
        this.servicioEmail = servicioEmail;
        this.servicioUsuario = servicioUsuario;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/forgot")
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> requestBody) {
        try {
            String email = requestBody.get("email");
        UsuarioDTO usuarioDTO = servicioUsuario.buscarPorCorreo(email).orElse(null);
        if (usuarioDTO == null) {
            return ResponseEntity.badRequest().body("Usuario no encontrado");
        }
        else {
            String token = jwtUtil.generateToken(usuarioDTO.getNombreUsuarioDto());
            String resetLink = "http://localhost:3000/Contrasena-Recordar?token=" + token;
            String mensajeHtml = "<p>Haga click en el siguiente enlace para actualizar su contraseña:</p>"
                    + "<a href='" + resetLink + "'>Restablecer contraseña</a>";
            servicioEmail.enviarEmail(email, "Restablecer contraseña", mensajeHtml);
            return ResponseEntity.ok().body("correo enviado con exito");
        }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("error" + e.getMessage());
        }
    }
    @PostMapping("/Cambiar-Contrasena")
    public ResponseEntity<String> cambiarContrasena(@RequestBody Map<String, String> requestBody) {
        String contrasenaUsuarioDto = requestBody.get("contrasenaUsuarioDto");
        String token = requestBody.get("token");

        try {
            String username = jwtUtil.extractUsername(token);
            Optional<UsuarioDTO> usuarioDTOOptional = servicioUsuario.buscarPorNombre(username);
            UsuarioDTO usuarioDTO;
            if(usuarioDTOOptional.isPresent()) {
                usuarioDTO = usuarioDTOOptional.get();
                usuarioDTO.setContrasenaUsuarioDto(contrasenaUsuarioDto);
                servicioUsuario.actualizarUsuario(usuarioDTO );
                return ResponseEntity.ok().body("Contrasena actualizada con exito");

            }else {
                return ResponseEntity.badRequest().body("Usuario no encontrado");
            }


        }catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("no se pudo actualizar la contraseña" + e.getMessage());
        }
    }

}
