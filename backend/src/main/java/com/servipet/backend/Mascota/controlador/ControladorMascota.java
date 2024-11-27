package com.servipet.backend.Mascota.controlador;

import com.servipet.backend.Estado.Modelo.Estado;
import com.servipet.backend.Estado.Repositorio.RepositorioEstado;
import com.servipet.backend.Mascota.DTO.MascotaDTO;
import com.servipet.backend.Mascota.clase.Mascota;

import com.servipet.backend.Mascota.clase.TamañoMascota;
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
    private final RepositorioEstado repositorioEstado;

    @Autowired
    public ControladorMascota(ServicioMascota servicioMascota, RepositorioEstado repositorioEstado) {
        this.servicioMascota = servicioMascota;
        this.repositorioEstado = repositorioEstado;
    }

    @PostMapping("/Registrar")
    public ResponseEntity<String> registroMascota(@RequestBody MascotaDTO mascotaDTO){
        try {
            servicioMascota.guardarMascota(mascotaDTO);
            return ResponseEntity.ok("Mascota Registrada");

        }catch (Exception e){
            return ResponseEntity.badRequest().body("Error al registrar mascota");
        }

    }
    @GetMapping("/Consultar/{id}")
    public ResponseEntity< List<Mascota>> ConsultarMascota(@PathVariable String id){
        try {
            List<Mascota> mascotaList = servicioMascota.consultarMascota(id);
            return ResponseEntity.ok(mascotaList);

        }catch (Exception e){
            return ResponseEntity.badRequest().body(null);
        }


    }
    @GetMapping("/Consultar/esp/{id}")
    public ResponseEntity< Optional<Mascota>> ConsultarEsp(@PathVariable String id){
        try {
            Optional<Mascota> mascotaOptional = servicioMascota.consultaEsp(id);
            return ResponseEntity.ok(mascotaOptional);

        }catch (Exception e){
            return ResponseEntity.badRequest().body(null);
        }

    }
    @PutMapping("/Actualizar/{id}")
    public ResponseEntity<String> ActualizarMascota(@PathVariable String id ,@RequestBody Mascota mascota){
        try {
            mascota.setId(id);
            servicioMascota.actualizarMascota(mascota);
            return ResponseEntity.ok("Mascota Actualizada");

        }catch (Exception e){
            return ResponseEntity.badRequest().body(null);
        }

    }
    @PutMapping("/Eliminar/{id}")
    public ResponseEntity<String> DesactivarMascota(@PathVariable String id, Mascota mascota){
        try {
            mascota.setId(id);
            servicioMascota.desactivarMascota(mascota);
            return ResponseEntity.ok("Mascota eliminada");

        }catch (Exception e){
            return ResponseEntity.badRequest().body(null);
        }

    }
    @GetMapping("/Consultar/Tipo")
    public ResponseEntity< List<TipoDeMascota>> ConsultarTipo(){
        try {
           List<TipoDeMascota> tipoDeMascotaList = servicioMascota.consultarTipo();
           return ResponseEntity.ok(tipoDeMascotaList);

        }catch (Exception e){
            return ResponseEntity.badRequest().body(null);
        }

    }

}
