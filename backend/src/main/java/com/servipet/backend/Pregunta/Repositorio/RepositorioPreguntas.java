package com.servipet.backend.Pregunta.Repositorio;

import com.servipet.backend.Pregunta.Modelo.Pregunta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface RepositorioPreguntas extends JpaRepository<Pregunta, Long> {
    List<Pregunta> findByIdProducto(String idProducto);
    Optional<Pregunta> findById(int idPregunta);
    List<Pregunta> findByIdProductoInOrderByFechaCreacionDesc(List<String> idsProducto);

}
