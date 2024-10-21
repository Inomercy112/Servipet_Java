package com.servipet.backend.Pedido.Repositorio;

import com.servipet.backend.Pedido.Modelo.MetodoEntrega;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorioMetodoEntrega extends JpaRepository<MetodoEntrega, Byte> {
}
