package com.servipet.backend.Producto.Resolvers;

import com.servipet.backend.Producto.DTO.ProductoDTO;
import com.servipet.backend.Producto.Servicio.ServicioProducto;
import com.servipet.backend.Etiquetas.PublicAccess;
import graphql.kickstart.tools.GraphQLQueryResolver;


import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;


@Component
public class ProductoResolver implements GraphQLQueryResolver {
    private final ServicioProducto servicioProducto;

    public ProductoResolver(ServicioProducto servicioProducto) {
        this.servicioProducto = servicioProducto;
    }
    @PublicAccess(isPrivate = false)
    public  List<ProductoDTO> getproductos() {
        try {
            return servicioProducto.listarProductos();

        }catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }
    @PublicAccess(isPrivate = false)
    public Optional<ProductoDTO> getproductoById(String id) {

        return servicioProducto.buscarProducto(id);

    }
}
