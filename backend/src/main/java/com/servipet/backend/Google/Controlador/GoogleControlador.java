package com.servipet.backend.Google.Controlador;


import com.servipet.backend.Google.Servicio.GoogleServicio;
import com.servipet.backend.Usuario.Componentes.JwtUtil;
import com.servipet.backend.Usuario.DTO.RespuestaLogin;
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

    @PostMapping("/auth")
    public ResponseEntity<?> authenticateWithGoogle(@RequestBody Map<String, String> request) {
        try {
            // Extraer el token del cuerpo de la solicitud
            String token = request.get("token");
            System.out.println("token " + token);

            // Verificar el token y obtener el payload
            var payload = googleAuthService.verifyToken(token);
            System.out.println("Payload recibido: " + payload);
            System.out.println("Email del payload: " + payload.getEmail());

            // Buscar el usuario en la base de datos utilizando el correo electrónico del payload
            Optional<Usuario> usuario = servicioUsuario.login(payload.getEmail());

            if (usuario.isEmpty()) {
                System.out.println("Usuario no encontrado");
                Usuario nuevoUsuario = new Usuario();
                nuevoUsuario.setCorreoUsuario(payload.getEmail());
                nuevoUsuario.setNombreUsuario(payload.get("name").toString());
                nuevoUsuario.setRolUsuario("cliente");
                servicioUsuario.registrarUsuarioOAuth(nuevoUsuario);
                System.out.println(nuevoUsuario.getNombreUsuario());
                usuario = Optional.of(nuevoUsuario);
                System.out.println("Nuevo usuario creado: " + usuario);
            }

            // Generar el token JWT para el usuario
            String jwtToken = jwtUtil.generateToken(usuario.get().getNombreUsuario(), usuario.get().getId(), usuario.get().getRolUsuario());

            // Crear una instancia de RespuestaLogin con los datos necesarios
            RespuestaLogin respuestaLogin = new RespuestaLogin(
                    usuario.get().getNombreUsuario(),
                    jwtToken,
                    usuario.get().getRolUsuario(),
                    usuario.get().getId(),
                    usuario.get().getDocumentoUsuario()
            );

            // Devolver la respuesta con el cuerpo RespuestaLogin
            return ResponseEntity.ok(respuestaLogin);

        } catch (Exception e) {
            // En caso de error, devolver un mensaje de error
            return ResponseEntity.badRequest().body("Token inválido: " + e.getMessage());
        }
    }



}
