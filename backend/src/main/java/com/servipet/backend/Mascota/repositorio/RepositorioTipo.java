package com.servipet.backend.Mascota.repositorio;

import com.servipet.backend.Mascota.clase.TipoDeMascota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorioTipo extends JpaRepository<TipoDeMascota, Long> {
    TipoDeMascota findById(int id);
}
