package com.servipet.backend.Mascota.repositorio;

import com.servipet.backend.Mascota.clase.Mascota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorioMascota extends JpaRepository<Mascota,Long> {
}
