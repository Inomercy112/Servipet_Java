package com.servipet.backend.Puntuaciones.Repositorio;

import com.servipet.backend.Puntuaciones.Modelo.Puntuacion;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RepositorioPuntuacion extends MongoRepository<Puntuacion,String> {
   Optional <Puntuacion> findByUsuarioPuntuacion(String nombre);
}
