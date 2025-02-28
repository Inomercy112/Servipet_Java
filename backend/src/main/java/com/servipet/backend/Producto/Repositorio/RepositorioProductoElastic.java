package com.servipet.backend.Producto.Repositorio;

import com.servipet.backend.Producto.Modelo.ProductoElastic;

import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface RepositorioProductoElastic extends ElasticsearchRepository<ProductoElastic, String> {
    @Query("{\"bool\": {\"must\": [{\"match\": {\"nombreProducto\": {\"query\": \"?0\", \"fuzziness\": \"AUTO\", \"operator\": \"AND\"}}}]}}")
    List<ProductoElastic> findByNombreProductoWildcard(String nombre);


}
