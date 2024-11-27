package com.servipet.backend.Usuario.Controlador;

import com.servipet.backend.Usuario.Modelo.LoginUsuario;
import com.servipet.backend.Usuario.DTO.RespuestaLogin;
import com.servipet.backend.Usuario.Modelo.Usuario;
import com.servipet.backend.Usuario.Componentes.JwtUtil;
import com.servipet.backend.Usuario.Servicio.ServicioUsuario;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/autenticacion")
public class ControladorLogin {

    private final ServicioUsuario servicioUsuario;

    private final JwtUtil jwtUtil;

    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Autowired
    public ControladorLogin(ServicioUsuario servicioUsuario, JwtUtil jwtUtil) {
        this.servicioUsuario = servicioUsuario;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/Login")
    public ResponseEntity<?> login(@RequestBody LoginUsuario loginUsuario) {
        try {
            String correo = loginUsuario.getCorreo();
            String contrasena = loginUsuario.getContrasena();


            Optional<Usuario> usuarioOptional = servicioUsuario.login(correo);

            if (usuarioOptional.isPresent()) {

                Usuario usuario = usuarioOptional.get();
                boolean validacion = bCryptPasswordEncoder.matches(contrasena, usuario.getContrasenaUsuario());

                if (validacion) {

                    String token = jwtUtil.generateToken(usuario.getNombreUsuario());
                    RespuestaLogin respuestaLogin = new RespuestaLogin(usuario.getNombreUsuario(), token, usuario.getRolUsuario(), usuario.getId(), usuario.getDocumentoUsuario());
                    return ResponseEntity.ok(respuestaLogin);

                }
                else{
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas");
                }
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas");
            }

        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage() + " Problemas con el servidor " );
        }


    }

    @PostMapping("/Logout")
    public ResponseEntity<String> cerrarSesion(HttpSession session){
        try {
            session.invalidate();
            return ResponseEntity.ok("sesion cerrada");

        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al cerrar sesion");
        }

    }
}



