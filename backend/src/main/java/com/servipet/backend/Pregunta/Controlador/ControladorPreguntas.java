package com.servipet.backend.Pregunta.Controlador;


import com.servipet.backend.Pregunta.DTO.PreguntasDTO;
import com.servipet.backend.Pregunta.Servicio.ServicioPreguntas;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pregunta")
public class ControladorPreguntas {
    private final ServicioPreguntas servicioPreguntas;

    public ControladorPreguntas(ServicioPreguntas servicioPreguntas) {
        this.servicioPreguntas = servicioPreguntas;
    }

    @PostMapping("/Registrar")
    public ResponseEntity<?> guardarPregunta(@RequestBody PreguntasDTO preguntasDTO) {
        try {
            ResponseEntity<?> respuesta = servicioPreguntas.registrarPregunta(preguntasDTO);
            if (respuesta.getStatusCode() == HttpStatus.OK){
                return ResponseEntity.status(HttpStatus.CREATED).body(respuesta.getBody());

            }else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(respuesta.getBody());
            }

            }catch(Exception e){
                return ResponseEntity.badRequest().body(e.getMessage());
            }
    }
    @GetMapping("/Consultar/{id}")
    public ResponseEntity<List<PreguntasDTO>> consultarPregunta(@PathVariable String id) {
        try {
            List<PreguntasDTO> preguntasList = servicioPreguntas.obtenerPreguntas(id);
            return ResponseEntity.ok(preguntasList);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(null);
        }
    }
}