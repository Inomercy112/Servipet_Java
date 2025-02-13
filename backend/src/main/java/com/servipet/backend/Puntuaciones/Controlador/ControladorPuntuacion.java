package com.servipet.backend.Puntuaciones.Controlador;

import com.servipet.backend.Puntuaciones.DTO.PuntuacionDTO;
import com.servipet.backend.Puntuaciones.Servicio.ServicioPuntuacion;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/puntuacion")
public class ControladorPuntuacion {
    private final ServicioPuntuacion servicioPuntuacion;
    public ControladorPuntuacion(ServicioPuntuacion servicioPuntuacion) {
        this.servicioPuntuacion = servicioPuntuacion;
    }
    @PostMapping("/Registrar")
    public ResponseEntity<?> registrarPuntuacion(PuntuacionDTO puntuacionDTO) {
        try {
            servicioPuntuacion.registrarPuntuacion(puntuacionDTO);
            return ResponseEntity.ok("Registrado exitosamente");
        }catch(Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());

        }
        }
    @GetMapping("/Consultar/{id}")
    public ResponseEntity <Optional<PuntuacionDTO>> consultarPuntuacion(@PathVariable String id) {
        try {
            Optional<PuntuacionDTO> puntuacionDTO = servicioPuntuacion.buscarPuntuacion(id);
            return ResponseEntity.ok(puntuacionDTO);

        }catch(Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
