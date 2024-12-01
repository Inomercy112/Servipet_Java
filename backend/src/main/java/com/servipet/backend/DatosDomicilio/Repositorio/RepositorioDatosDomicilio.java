package com.servipet.backend.DatosDomicilio.Repositorio;

import com.servipet.backend.DatosDomicilio.Modelo.DatosDomicilio;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepositorioDatosDomicilio extends MongoRepository<DatosDomicilio, String> {
    List<DatosDomicilio> findByDuenoDomicilio(String nombre);

}
