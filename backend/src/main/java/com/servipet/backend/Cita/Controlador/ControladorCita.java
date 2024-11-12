package com.servipet.backend.Cita.Controlador;
import com.servipet.backend.Cita.Modelo.Cita;
import com.servipet.backend.Cita.Servicio.ServicioCita;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

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
    public ResponseEntity<String> registrarCita(@RequestBody Cita cita) {
        try {
            servicioCita.RegistroCita(cita);
            return ResponseEntity.ok("Cita registrada");

        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }

    }

    // Consultar todas las citas
    @GetMapping("/Consultar")
    public ResponseEntity< List<Cita>> consultarCita() {
        try {
            List<Cita> citaList = servicioCita.ConsultarCita();
            return ResponseEntity.ok(citaList);
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }

    // Consultar cita específica
    @GetMapping("/Consultar/{id}")
    public ResponseEntity<Cita> consultaEspecifica(@PathVariable Integer id) {
        try {
            return servicioCita.ConsultaEspecifica(id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }

    // Consultar citas de un usuario
    @GetMapping("/Consultar/cita/{id}")
    public ResponseEntity< List<Cita>> CitasUsuario(@PathVariable Integer id) {
        try {
            List<Cita> citaList = servicioCita.CitasUsuario(id);
            return ResponseEntity.ok(citaList);

        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }


    }

    @PutMapping("/aceptar/{id}")
    public ResponseEntity<String> aceptarCita(@PathVariable Long id) {
        try {
            servicioCita.aceptarCita(id);
            return ResponseEntity.ok("Cita aceptada");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    // Cancelar cita
    @PutMapping("/cancelar/{id}")
    public ResponseEntity<String> cancelarCita(@PathVariable Long id) {
        try {
            servicioCita.cancelarCita(id);
            return ResponseEntity.ok("Cita cancelada");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    // Actualizar diagnóstico
    @PutMapping("/actualizar/diagnostico/{id}")
    public ResponseEntity<String> actualizarDiagnostico(@PathVariable Integer id, @RequestBody Map<String, String> body) {
        String diagnostico = body.get("diagnostico");
        try {
            servicioCita.actualizarDiagnostico(id, diagnostico);
            return ResponseEntity.ok("Diagnóstico guardado con éxito");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    // Actualizar fecha y hora
    @PutMapping("/actualizar/fechaHora/{id}")
    public ResponseEntity<String> actualizarFechaHora(@PathVariable Integer id, @RequestBody Map<String, String> body) {
        try {
            servicioCita.actualizarFechaHora(id, body.get("fecha"), body.get("hora"));
            return ResponseEntity.ok("Fecha de Cita guardada");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
