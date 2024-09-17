package com.servipet.backend.Mascota.repositorio;

import com.servipet.backend.Mascota.clase.Mascota;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepositorioMascota extends JpaRepository<Mascota,Long> {
    List<Mascota> findByDuenoId(Integer id);

}
