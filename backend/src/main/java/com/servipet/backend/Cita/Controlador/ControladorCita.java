package com.servipet.backend.Cita.Controlador;

import com.servipet.backend.Cita.Modelo.Cita;
import com.servipet.backend.Cita.Repositorio.RepositorioCita;
import com.servipet.backend.Cita.Servicio.ServicioCita;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/cita")
public class ControladorCita {
    @Autowired
    private ServicioCita servicioCita;
    @Autowired
    private RepositorioCita repositorioCita;
    @PostMapping("/Registrar")
    public ResponseEntity<String> registrarCita(@RequestBody Cita cita){
        servicioCita.RegistroCita(cita);
        return ResponseEntity.ok("Cita registrada");
    }
    @GetMapping("/Consultar")
    public List<Cita> consultarCita(){
        return servicioCita.ConsultarCita();
    }
    @GetMapping("/Consultar/{id}")
    public Optional<Cita> consultaEspecifica(@PathVariable Integer id){
        return servicioCita.ConsultaEspecifica(id);
    }

    @GetMapping("/Consultar/cita/{id}")
    public List<Cita> CitasUsuario(@PathVariable Integer id){
        return servicioCita. CitasUsuario(id);
    }


    // Aceptar cita
    @PutMapping("/aceptar/{id}")
    public ResponseEntity<String> aceptarCita(@PathVariable Long id) {
        Cita cita = repositorioCita.findById(id)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));
        servicioCita.aceptarCita(cita);
        return ResponseEntity.ok("Cita aceptada");
    }

    // Cancelar cita
    @PutMapping("/cancelar/{id}")
    public ResponseEntity<String> cancelarCita(@PathVariable Long id) {
        Cita cita = repositorioCita.findById(id)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));
        servicioCita.cancelarCita(cita);
        return ResponseEntity.ok("Cita cancelada");
    }
    @PutMapping("/actualizar/diagnostico/{id}")
    public ResponseEntity<String> actualizarDiagnostico(@PathVariable Integer id, @RequestBody Map<String, String> body) {

        String diagnostico = body.get("diagnostico");


        Optional<Cita> optionalCita = repositorioCita.findById(id);
        if (optionalCita.isPresent()) {
            Cita cita = optionalCita.get();
            cita.setDiagnostico(diagnostico);
            servicioCita.actualizarDiagnostico(cita);
            return ResponseEntity.ok("Diagnóstico guardado con éxito");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cita no encontrada");
        }

    }
    @PutMapping("/actualizar/fechaHora/{id}")
    public ResponseEntity<String> actualizarFechaHora(@PathVariable Integer id, @RequestBody Map<?,?> body) {
        String fechaString = (String) body.get("fecha");
        String horaString = (String) body.get("hora");

        LocalDate fecha = LocalDate.parse(fechaString);
        LocalTime hora = LocalTime.parse(horaString);

        Optional<Cita> optionalCita = repositorioCita.findById(id);
        if (optionalCita.isPresent()) {
            Cita cita = optionalCita.get();
            cita.setFechaCita(fecha);
            cita.setHoraCita(hora);
            return ResponseEntity.ok("Fecha de Cita guardada");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cita no encontrada");
        }

    }


}
