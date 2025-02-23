package com.servipet.backend.Respuesta.Controlador;

import com.servipet.backend.Respuesta.DTO.RespuestaDTO;
import com.servipet.backend.Respuesta.Servicio.ServicioRespuesta;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/respuesta")
@RestController
public class ControladorRespuesta {
    private final ServicioRespuesta servicioRespuesta;
    public ControladorRespuesta(ServicioRespuesta servicioRespuesta) {
        this.servicioRespuesta = servicioRespuesta;
    }
    @PostMapping("/Registrar")
    public ResponseEntity<?> guardarRespuesta(@RequestBody RespuestaDTO respuestaDTO) {
        try {
            return servicioRespuesta.registrarRespuesta(respuestaDTO);
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/Consultar/{id}")
    public ResponseEntity<List<RespuestaDTO>> consultarRespuesta(@PathVariable int id) {
        try {
            List<RespuestaDTO> respuestaDTOList = servicioRespuesta.consultarRespuesta(id);
            return ResponseEntity.ok().body(respuestaDTOList);
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
