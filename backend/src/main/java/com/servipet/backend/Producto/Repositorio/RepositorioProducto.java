package com.servipet.backend.Producto.Repositorio;

import com.servipet.backend.Producto.Modelo.ProductoMongo;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RepositorioProducto extends MongoRepository<ProductoMongo, String> {
    @NotNull Optional<ProductoMongo> findById(@NotNull String id);
    List<ProductoMongo> findByEstadoProductoIsNullAndCantidadProductoGreaterThan(int cantidad);
    List<ProductoMongo> findByEstadoProductoIsNullAndDuenoProducto(String dueno);
    List<ProductoMongo> findByEstadoProductoIsNullAndCategoriasNombresContainingAndCantidadProductoGreaterThan(String categoria, int cantidad);

    List<ProductoMongo> findByDuenoProducto(String idVendedor);
}
