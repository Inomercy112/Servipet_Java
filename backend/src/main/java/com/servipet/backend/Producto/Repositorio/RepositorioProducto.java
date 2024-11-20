package com.servipet.backend.Producto.Repositorio;

import com.servipet.backend.Producto.Modelo.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorioProducto extends JpaRepository<Producto, Integer> {
}
