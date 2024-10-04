package com.servipet.backend.Cita.Servicio;

import com.servipet.backend.Cita.Modelo.Cita;
import com.servipet.backend.Cita.Modelo.EstadoCita;
import com.servipet.backend.Cita.Repositorio.RepositorioCita;
import com.servipet.backend.Cita.Repositorio.RepositorioEstadoCita;
import com.servipet.backend.Usuario.clase.Estado;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServicioCita {
    @Autowired
    private RepositorioCita repositorioCita;
    @Autowired
    private RepositorioEstadoCita repositorioEstadoCIta;

    public void RegistroCita(Cita cita){
        repositorioCita.save(cita);
    }
    public List<Cita> ConsultarCita(){

        return repositorioCita.findAll();
    }
    public Optional<Cita> ConsultaEspecifica(Integer id){
        return repositorioCita.findById(id);
    }
    public List<Cita> CitasUsuario(Integer id){
        return repositorioCita.findByQuienAsiste_Id(id);
    }
    public Cita ActualizarCita(Cita cita){

        return repositorioCita.save(cita);
    }

    public void aceptarCita(Cita cita) {
        EstadoCita estadoAceptado = repositorioEstadoCIta.findById(1L)
                .orElseThrow(() -> new RuntimeException("Estado de cita no encontrado"));
        cita.setEstadoCita(estadoAceptado);
        repositorioCita.save(cita);
    }


    public void cancelarCita(Cita cita) {
        EstadoCita estadoCancelado = repositorioEstadoCIta.findById(3L)
                .orElseThrow(() -> new RuntimeException("Estado de cita no encontrado"));
        cita.setEstadoCita(estadoCancelado);
        repositorioCita.save(cita);
    }
    public void actualizarDiagnostico(Cita cita){
        repositorioCita.save(cita);
    }



}
