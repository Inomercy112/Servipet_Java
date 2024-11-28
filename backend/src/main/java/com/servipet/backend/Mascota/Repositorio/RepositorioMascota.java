package com.servipet.backend.Mascota.Repositorio;

import com.servipet.backend.Estado.Modelo.Estado;
import com.servipet.backend.Mascota.Modelo.Mascota;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RepositorioMascota extends JpaRepository<Mascota,Long> {
    List<Mascota> findByDuenoMascota(String id);

    Optional<Mascota> findById(String id);

    List<Mascota> findByDuenoMascotaAndEstadoMascota(String dueno, Estado estado);

}
