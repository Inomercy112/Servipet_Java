package com.servipet.backend.Mascota.repositorio;

import com.servipet.backend.Mascota.clase.TamañoMascota;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepositorioTamano  extends JpaRepository<TamañoMascota, Long> {
    TamañoMascota findById(int id);
}
