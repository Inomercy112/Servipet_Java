package com.servipet.backend.Pedido.Repositorio;

import com.servipet.backend.Pedido.Modelo.EstadoEntrega;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorioEstadoEntrega extends JpaRepository<EstadoEntrega, Integer> {
}
