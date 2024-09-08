package com.servipet.backend.Mascota.controlador;

import com.servipet.backend.Mascota.clase.Mascota;

import com.servipet.backend.Mascota.servicio.ServicioMascota;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mascota")
public class ControladorMascota {
    @Autowired
    private ServicioMascota servicioMascota;
    @PostMapping("/Registrar")
    public ResponseEntity<String> registroMascota(@RequestBody Mascota mascota){
        servicioMascota.guardarMascota(mascota);
        return ResponseEntity.ok("Mascota Registrada");
    }
    @GetMapping("/Consultar")
    public List<Mascota> ConsultarMascota(){
        return servicioMascota.consultarMascota();
    }
    @PutMapping("/Actualizar/{id}")
    public ResponseEntity<String> ActualizarMascota(@PathVariable short id ,@RequestBody Mascota mascota){
        mascota.setIdMascota(id);
        servicioMascota.actualizarMascota(mascota);
        return ResponseEntity.ok("Mascota Actualizada");

    }
    public ResponseEntity<String> DesactivarMascota(@PathVariable short id, Mascota mascota){
        mascota.setIdMascota(id);
        servicioMascota.desactivarMascota(mascota);
        return ResponseEntity.ok("Mascota eliminada");
    }
}
