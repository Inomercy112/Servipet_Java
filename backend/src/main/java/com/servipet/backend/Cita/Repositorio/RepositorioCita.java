package com.servipet.backend.Cita.Repositorio;

import com.servipet.backend.Cita.Modelo.Cita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RepositorioCita extends JpaRepository<Cita, Long> {
    Optional<Cita> findById(Integer id);
    List<Cita> findByQuienAsiste(String id);
    List<Cita> findByMascotaAsiste_Id(String mascotaAsiste_id);
}
