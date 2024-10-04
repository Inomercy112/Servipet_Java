package com.servipet.backend.Cita.Repositorio;

import com.servipet.backend.Cita.Modelo.EstadoCita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface RepositorioEstadoCita extends JpaRepository<EstadoCita, Long> {

}
