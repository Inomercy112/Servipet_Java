package com.servipet.backend.Google.Controlador;


import com.servipet.backend.Google.Servicio.GoogleServicio;
import com.servipet.backend.Usuario.Componentes.JwtUtil;
import com.servipet.backend.Usuario.Modelo.Usuario;
import com.servipet.backend.Usuario.Servicio.ServicioUsuario;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/authgoogle")
public class GoogleControlador {

    private final GoogleServicio googleAuthService;
    private final JwtUtil jwtUtil;
    private final ServicioUsuario servicioUsuario;

    public GoogleControlador(GoogleServicio googleAuthService, JwtUtil jwtUtil, ServicioUsuario servicioUsuario) {
        this.googleAuthService = googleAuthService;
        this.jwtUtil = jwtUtil;
        this.servicioUsuario = servicioUsuario;
    }

    @PostMapping
    public ResponseEntity<?> authenticateWithGoogle(@RequestBody Map<String, String> request) {
        try {
            String token = request.get("token");
            var payload = googleAuthService.verifyToken(token);
            Optional<Usuario> usuario = servicioUsuario.login(payload.getEmail());

            if (usuario.isEmpty()) {
                Usuario nuevoUsuario = new Usuario();
                nuevoUsuario.setCorreoUsuario(payload.getEmail());
                nuevoUsuario.setNombreUsuario(payload.get("name").toString());
                nuevoUsuario.setImagenUsuario(Base64.getDecoder().decode(payload.get("image").toString()));
                servicioUsuario.registrarUsuarioOAuth(nuevoUsuario);
                usuario = Optional.of(nuevoUsuario);
                return ResponseEntity.ok().body(usuario);
            }
            String jwtToken = jwtUtil.generateToken(usuario.get().getNombreUsuario(),usuario.get().getId(),usuario.get().getRolUsuario() );
            return ResponseEntity.ok().header("Authorization", jwtToken).build();

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Token inválido");
        }
    }
}
