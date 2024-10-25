package com.servipet.backend.Cita.Servicio;

import com.servipet.backend.Cita.Modelo.Cita;
import com.servipet.backend.Cita.Modelo.EstadoCita;
import com.servipet.backend.Cita.Repositorio.RepositorioCita;
import com.servipet.backend.Cita.Repositorio.RepositorioEstadoCita;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;


@Service
public class ServicioCita {

    @Autowired
    private RepositorioCita repositorioCita;

    @Autowired
    private RepositorioEstadoCita repositorioEstadoCita;

    // Registro de cita
    public void RegistroCita(Cita cita) {
        repositorioCita.save(cita);
    }

    // Consultar todas las citas
    public List<Cita> ConsultarCita() {
        return repositorioCita.findAll();
    }

    // Consultar cita específica
    public Optional<Cita> ConsultaEspecifica(Integer id) {
        return repositorioCita.findById(id);
    }

    // Consultar citas de un usuario específico
    public List<Cita> CitasUsuario(Integer id) {
        return repositorioCita.findByQuienAsiste_Id(id);
    }

    // Aceptar cita
    public void aceptarCita(Long id) {
        Cita cita = repositorioCita.findById(id)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));
        EstadoCita estadoAceptado = repositorioEstadoCita.findById(1L)
                .orElseThrow(() -> new RuntimeException("Estado de cita no encontrado"));
        cita.setEstadoCita(estadoAceptado);
        repositorioCita.save(cita);
    }

    // Cancelar cita
    public void cancelarCita(Long id) {
        Cita cita = repositorioCita.findById(id)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));
        EstadoCita estadoCancelado = repositorioEstadoCita.findById(3L)
                .orElseThrow(() -> new RuntimeException("Estado de cita no encontrado"));
        cita.setEstadoCita(estadoCancelado);
        repositorioCita.save(cita);
    }

    // Actualizar diagnóstico de la cita
    public void actualizarDiagnostico(Integer id, String diagnostico) {
        Cita cita = repositorioCita.findById(id)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));
        cita.setDiagnostico(diagnostico);
        repositorioCita.save(cita);
    }

    // Actualizar fecha y hora de la cita
    public void actualizarFechaHora(Integer id, String fechaString, String horaString) {
        Cita cita = repositorioCita.findById(id)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));
        LocalDate fecha = LocalDate.parse(fechaString);
        LocalTime hora = LocalTime.parse(horaString);
        cita.setFechaCita(fecha);
        cita.setHoraCita(hora);
        repositorioCita.save(cita);
    }
}
