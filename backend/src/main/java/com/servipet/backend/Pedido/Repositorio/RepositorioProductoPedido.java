package com.servipet.backend.Pedido.Repositorio;

import com.servipet.backend.Pedido.Modelo.ProductoPedido;
import com.servipet.backend.Producto.Modelo.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RepositorioProductoPedido extends JpaRepository<ProductoPedido, Integer> {
    List<ProductoPedido> findByQuienVende(String vendedor);
}
