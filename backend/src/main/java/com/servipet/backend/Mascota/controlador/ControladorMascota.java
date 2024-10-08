package com.servipet.backend.Mascota.controlador;

import com.servipet.backend.Mascota.clase.Mascota;

import com.servipet.backend.Mascota.clase.TipoDeMascota;
import com.servipet.backend.Mascota.servicio.ServicioMascota;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/mascota")
public class ControladorMascota {
    private final ServicioMascota servicioMascota;
    @Autowired
    public ControladorMascota(ServicioMascota servicioMascota) {
        this.servicioMascota = servicioMascota;
    }

    @PostMapping("/Registrar")
    public ResponseEntity<String> registroMascota(@RequestBody Mascota mascota){
        servicioMascota.guardarMascota(mascota);
        return ResponseEntity.ok("Mascota Registrada");
    }
    @GetMapping("/Consultar/{id}")
    public List<Mascota> ConsultarMascota(@PathVariable Integer id){
        return servicioMascota.consultarMascota(id);
    }
    @GetMapping("/Consultar/esp/{id}")
    public Optional<Mascota> ConsultarEsp(@PathVariable String id){
        return servicioMascota.consultaEsp(id);
    }
    @PutMapping("/Actualizar/{id}")
    public ResponseEntity<String> ActualizarMascota(@PathVariable String id ,@RequestBody Mascota mascota){
        mascota.setId(id);
        servicioMascota.actualizarMascota(mascota);
        return ResponseEntity.ok("Mascota Actualizada");

    }
    @PutMapping("/Eliminar/{id}")
    public ResponseEntity<String> DesactivarMascota(@PathVariable String id, Mascota mascota){
        mascota.setId(id);
        servicioMascota.desactivarMascota(mascota);
        return ResponseEntity.ok("Mascota eliminada");
    }
    @GetMapping("/Consultar/Tipo")
    public List<TipoDeMascota> ConsultarTipo(){
        return servicioMascota.consultarTipo();
    }
}
