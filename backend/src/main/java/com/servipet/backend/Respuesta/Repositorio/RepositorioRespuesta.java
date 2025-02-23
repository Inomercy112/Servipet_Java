package com.servipet.backend.Respuesta.Repositorio;

import com.servipet.backend.Respuesta.Modelo.Respuesta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface RepositorioRespuesta extends JpaRepository<Respuesta, Long> {
    List<Respuesta> findByIdPregunta_Id(int idPregunta_id);
}
