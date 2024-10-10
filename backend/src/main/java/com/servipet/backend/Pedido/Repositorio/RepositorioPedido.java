package com.servipet.backend.Pedido.Repositorio;

import com.servipet.backend.Pedido.Modelo.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RepositorioPedido extends JpaRepository<Pedido, Integer> {
    Optional<Pedido> findById(int id);
}
