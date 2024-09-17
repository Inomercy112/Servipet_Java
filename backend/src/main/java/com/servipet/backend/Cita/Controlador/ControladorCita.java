package com.servipet.backend.Cita.Controlador;

import com.servipet.backend.Cita.Modelo.Cita;
import com.servipet.backend.Cita.Servicio.ServicioCita;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cita")
public class ControladorCita {
    @Autowired
    private ServicioCita servicioCita;
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

}
