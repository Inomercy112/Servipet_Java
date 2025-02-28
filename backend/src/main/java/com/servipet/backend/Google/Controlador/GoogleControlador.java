package com.servipet.backend.Google.Controlador;


import com.servipet.backend.Google.Servicio.GoogleServicio;
import com.servipet.backend.Usuario.Componentes.JwtUtil;
import com.servipet.backend.Usuario.DTO.UsuarioDTO;
import com.servipet.backend.Usuario.Modelo.Usuario;
import com.servipet.backend.Usuario.Servicio.ServicioUsuario;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/authgoogle")
@CrossOrigin(origins = "http://localhost:3000")  // Permitir CORS
public class GoogleControlador {

    private final GoogleServicio googleAuthService;
    private final JwtUtil jwtUtil; // Asumo que tienes una clase para generar tokens JWT
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
            // Generar JWT para manejar la sesión en tu backend
            String jwtToken = jwtUtil.generateToken(usuario.get().getNombreUsuario(),usuario.get().getId(),usuario.get().getRolUsuario() );

            return ResponseEntity.ok(Map.of(
                    "jwtToken", jwtToken,  // 🔥 Retorna un token JWT para manejar la sesión
                    "email", payload.getEmail(),
                    "name", payload.get("name"),
                    "picture", payload.get("picture")
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Token inválido");
        }
    }
}
