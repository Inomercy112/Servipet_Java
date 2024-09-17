package com.servipet.backend.Cita.Servicio;

import com.servipet.backend.Cita.Modelo.Cita;
import com.servipet.backend.Cita.Repositorio.RepositorioCita;
import com.servipet.backend.Usuario.clase.Estado;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServicioCita {
    @Autowired
    private RepositorioCita repositorioCita;

    public void RegistroCita(Cita cita){
        repositorioCita.save(cita);
    }
    public List<Cita> ConsultarCita(){

        return repositorioCita.findAll();
    }
    public Optional<Cita> ConsultaEspecifica(Integer id){
        return repositorioCita.findById(id);
    }
    public Cita ActualizarCita(Cita cita){

        return repositorioCita.save(cita);
    }

    public Cita EliminarCita(Cita cita){
        Estado estado = cita.getEstado();
        return repositorioCita.save(cita);
    }

}
