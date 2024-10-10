package com.servipet.backend.Usuario.controlador;

import com.servipet.backend.Usuario.clase.LoginUsuario;
import com.servipet.backend.Usuario.clase.RespuestaLogin;
import com.servipet.backend.Usuario.clase.Rol;
import com.servipet.backend.Usuario.clase.Usuario;
import com.servipet.backend.Usuario.componentes.JwtUtil;
import com.servipet.backend.Usuario.servicio.ServicioUsuario;
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

        String correo = loginUsuario.getCorreo();
        String contrasena = loginUsuario.getContrasena();


        Optional<Usuario> usuarioOptional = servicioUsuario.login(correo);

        if (usuarioOptional.isPresent()) {

            Usuario usuario = usuarioOptional.get();
            Boolean validacion = bCryptPasswordEncoder.matches(contrasena, usuario.getContrasenaUsuario());
            System.out.println(validacion);

            Rol rol = usuario.getRol();
            String token = jwtUtil.generateToken(usuario.getNombreUsuario());
            RespuestaLogin respuestaLogin = new RespuestaLogin(usuario.getNombreUsuario(), token, rol.getId(), usuario.getId(), usuario.getDocumento());
            return ResponseEntity.ok(respuestaLogin);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas");
        }
    }

    @PostMapping("/Logout")
    public ResponseEntity<String> cerrarSesion(HttpSession session){
        session.invalidate();
        return ResponseEntity.ok("sesion cerrada");
    }
}



