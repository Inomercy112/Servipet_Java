package com.servipet.backend.Mascota.Repositorio;

import com.servipet.backend.Mascota.Modelo.TamañoMascota;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepositorioTamano  extends JpaRepository<TamañoMascota, Long> {
    TamañoMascota findById(int id);
}
