package com.servipet.backend.DatosDomicilio.Controlador;

import com.servipet.backend.DatosDomicilio.DTO.DatosDomicilioDTO;
import com.servipet.backend.DatosDomicilio.Servicio.ServicioDatosDomicilio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/datosDomicilio")
public class ControladorDatosDomicilio {
    private final ServicioDatosDomicilio servicioDatosDomicilio;
    @Autowired
    public ControladorDatosDomicilio(ServicioDatosDomicilio servicioDatosDomicilio) {
        this.servicioDatosDomicilio = servicioDatosDomicilio;
    }
    @PostMapping("/Registrar")
    public ResponseEntity<String> registrarDatosDomicilio(@RequestBody DatosDomicilioDTO datosDomicilioDTO) {
        try {
            servicioDatosDomicilio.registrarDatosDomicilio(datosDomicilioDTO);
            return ResponseEntity.ok("Registro exitoso");
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body("Error con el registro" + e.getMessage());
        }
    }
    @GetMapping("/Consultar/{id}")
    public ResponseEntity<List<DatosDomicilioDTO>> consultarDatosDomicilio(@PathVariable String id) {
        try {
                List<DatosDomicilioDTO> datosDomicilioDTOList =   servicioDatosDomicilio.buscarDatosDomicilioPorId(id);
                 return ResponseEntity.ok(datosDomicilioDTOList);
        }catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
