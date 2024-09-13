package com.servipet.backend.Mascota.repositorio;

import com.servipet.backend.Mascota.clase.TipoMascota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorioTipo extends JpaRepository<TipoMascota, Long> {
}
