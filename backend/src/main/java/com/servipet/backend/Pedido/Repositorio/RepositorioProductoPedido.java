package com.servipet.backend.Pedido.Repositorio;

import com.servipet.backend.Pedido.Modelo.ProductoPedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorioProductoPedido extends JpaRepository<ProductoPedido, Integer> {
}
