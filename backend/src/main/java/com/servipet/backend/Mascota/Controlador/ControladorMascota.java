package com.servipet.backend.Mascota.Controlador;



import com.servipet.backend.Mascota.DTO.MascotaDTO;
import com.servipet.backend.Mascota.Modelo.TipoDeMascota;
import com.servipet.backend.Mascota.Servicio.ServicioMascota;
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
    public ResponseEntity<String> registroMascota(@RequestBody MascotaDTO mascotaDTO){
        try {
            servicioMascota.guardarMascota(mascotaDTO);
            return ResponseEntity.ok("Mascota Registrada");

        }catch (Exception e){
            return ResponseEntity.badRequest().body("Error al registrar mascota"+ e.getMessage());
        }

    }
    @GetMapping("/Consultar/{id}")
    public ResponseEntity< List<MascotaDTO>> ConsultarMascota(@PathVariable String id){
        try {
            List<MascotaDTO> mascotaList = servicioMascota.consultarMascota(id);
            return ResponseEntity.ok(mascotaList);

        }catch (Exception e){
            return ResponseEntity.badRequest().body(null);
        }


    }
    @GetMapping("/Consultar/esp/{id}")
    public ResponseEntity< Optional<MascotaDTO>> ConsultarEsp(@PathVariable String id){
        try {
            Optional<MascotaDTO> mascotaOptional = servicioMascota.consultaEsp(id);
            return ResponseEntity.ok(mascotaOptional);

        }catch (Exception e){
            return ResponseEntity.badRequest().body(null);
        }

    }
    @PutMapping("/Actualizar/{id}")
    public ResponseEntity<String> ActualizarMascota(@PathVariable String id ,@RequestBody MascotaDTO mascotaDto){
        try {
            mascotaDto.setIdDto(id);
            Optional<MascotaDTO> mascotaOptional = servicioMascota.consultaEsp(id);
            if(mascotaOptional.isPresent()){
                servicioMascota.guardarMascota(mascotaDto);
                return ResponseEntity.ok("Mascota Actualizada");
            }else {
                return ResponseEntity.badRequest().body("Mascota no encontrada"+ id);
            }
        }catch (Exception e){
            return ResponseEntity.badRequest().body("Error al actualizar mascota"+ id);
        }

    }
    @PutMapping("/Eliminar/{id}")
    public ResponseEntity<String> DesactivarMascota(@PathVariable String id){
        try {
            Optional<MascotaDTO> mascotaDTOOptional = servicioMascota.consultaEsp(id);
            if(mascotaDTOOptional.isPresent()){
                servicioMascota.desactivarMascota(mascotaDTOOptional.get());
                return ResponseEntity.ok("Mascota eliminada");

            }else {
                return ResponseEntity.badRequest().body("Mascota no encontrada"+ id);
            }


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
