package com.servipet.backend.Mascota.Repositorio;

import com.servipet.backend.Mascota.Modelo.TipoDeMascota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorioTipo extends JpaRepository<TipoDeMascota, Long> {
    TipoDeMascota findById(int id);
}
