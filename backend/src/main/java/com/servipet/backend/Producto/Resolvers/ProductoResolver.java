package com.servipet.backend.Producto.Resolvers;

import com.servipet.backend.Producto.Modelo.Producto;
import com.servipet.backend.Producto.Servicio.ServicioProducto;
import com.servipet.backend.etiquetas.PublicAccess;
import graphql.kickstart.tools.GraphQLQueryResolver;
import org.springframework.stereotype.Component;

import java.util.List;


@Component
public class ProductoResolver implements GraphQLQueryResolver {
    private final ServicioProducto servicioProducto;

    public ProductoResolver(ServicioProducto servicioProducto) {
        this.servicioProducto = servicioProducto;
    }

    public List<Producto> getproductos() {

        return servicioProducto.ListarProductos();
    }
}
