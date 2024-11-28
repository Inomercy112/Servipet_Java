package com.servipet.backend.Cita.Repositorio;

import com.servipet.backend.Cita.Modelo.EstadoCita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface RepositorioEstadoCita extends JpaRepository<EstadoCita, Long> {
    EstadoCita findById(int id);

}
