package com.servipet.backend.Cita.Controlador;
import com.servipet.backend.Cita.DTO.CitaDTO;
import com.servipet.backend.Cita.Servicio.ServicioCita;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/cita")
public class ControladorCita {
    private final ServicioCita servicioCita;
    @Autowired
    public ControladorCita(ServicioCita servicioCita) {
        this.servicioCita = servicioCita;
    }


    // Registrar cita
    @PostMapping("/Registrar")
    public ResponseEntity<String> registrarCita(@RequestBody CitaDTO citaDTO) {
        try {
            System.out.println( "Controlador" + citaDTO.getMascotaAsisteDto().getIdDto());
            servicioCita.RegistroCita(citaDTO);
            return ResponseEntity.ok("Cita registrada");

        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    // Consultar todas las citas
    @GetMapping("/Consultar")
    public ResponseEntity< List<CitaDTO>> consultarCita() {
        try {
            List<CitaDTO> citaList = servicioCita.ConsultarCita();
            return ResponseEntity.ok(citaList);
        }catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }

    // Consultar cita específica
    @GetMapping("/Consultar/{id}")
    public ResponseEntity<CitaDTO> consultaEspecifica(@PathVariable Integer id) {
        try {
            return servicioCita.ConsultaEspecifica(id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
        }catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }

    // Consultar citas de un usuario
    @GetMapping("/Consultar/cita/{id}")
    public ResponseEntity<List<CitaDTO>> CitasUsuario(@PathVariable String id) {
        try {
            List<CitaDTO> citaList = servicioCita.CitasUsuario(id);
            return ResponseEntity.ok(citaList);

        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }


    }

    @PutMapping("/Aceptar/{id}")
    public ResponseEntity<String> aceptarCita(@PathVariable Integer id) {
        try {
            Optional<CitaDTO> citaDTOOptional = servicioCita.ConsultaEspecifica(id);
            if (citaDTOOptional.isPresent()) {

                servicioCita.aceptarCita(citaDTOOptional.get());
                return ResponseEntity.ok("Cita aceptada");
            }else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cita no encontrada");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    // Cancelar cita
    @PutMapping("/Cancelar/{id}")
    public ResponseEntity<String> cancelarCita(@PathVariable Integer id) {
        try {
            Optional <CitaDTO> CitaDTOOptional = servicioCita.ConsultaEspecifica(id);
            if (CitaDTOOptional.isPresent()) {
                servicioCita.cancelarCita(CitaDTOOptional.get());
                return ResponseEntity.ok("Cita cancelada");
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cita nao encontrada");
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    // Actualizar diagnóstico
    @PutMapping("/Actualizar/Diagnostico/{id}")
    public ResponseEntity<String> actualizarDiagnostico(@PathVariable Integer id, @RequestBody Map<String, String> body) {
        String diagnostico = body.get("diagnostico");
        try {
            Optional<CitaDTO> citaDTOOptional = servicioCita.ConsultaEspecifica(id);
            if (citaDTOOptional.isPresent()) {
                servicioCita.actualizarDiagnostico(citaDTOOptional.get(), diagnostico);
                return ResponseEntity.ok("Diagnóstico guardado con éxito");

            }else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cita no encontrada");
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    // Actualizar fecha y hora
    @PutMapping("/Actualizar/FechaHora/{id}")
    public ResponseEntity<String> actualizarFechaHora(@PathVariable Integer id, @RequestBody Map<String, String> body) {
        try {
            Optional<CitaDTO> citaDTOOptional = servicioCita.ConsultaEspecifica(id);
            if (citaDTOOptional.isPresent()) {
                servicioCita.actualizarFechaHora(citaDTOOptional.get(), body.get("fechaCitaDto"), body.get("horaCitaDto"));
                return ResponseEntity.ok("Fecha de Cita guardada");

            }else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cita no encontrada");
            }

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
