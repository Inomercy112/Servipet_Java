package com.servipet.backend.Pedido.Repositorio;

import com.servipet.backend.Pedido.Modelo.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepositorioPedido extends JpaRepository<Pedido, Integer> {
    List<Pedido> findByQuienCompra(String quienCompra);
    @Query("SELECT DISTINCT p FROM Pedido p JOIN p.detallesPedido dp WHERE dp.quienVende = :vendedor")
    List<Pedido> findByVendedor(@Param("vendedor") String vendedor);
}
