package com.servipet.backend.Producto.Repositorio;

import com.servipet.backend.Producto.Modelo.Producto;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RepositorioProducto extends MongoRepository<Producto, String> {
    @NotNull Optional<Producto> findById(@NotNull String id);
    List<Producto> findByEstadoProductoIsNull();
}
