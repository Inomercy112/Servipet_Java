package com.servipet.backend.Categoria.Resolvers;

import com.servipet.backend.Categoria.Modelo.Categoria;
import com.servipet.backend.Categoria.Servicio.ServicioCategoria;
import com.servipet.backend.Etiquetas.PublicAccess;
import graphql.kickstart.tools.GraphQLQueryResolver;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public class CategoriaResolver implements GraphQLQueryResolver {
    private final ServicioCategoria servicioCategoria;
    public CategoriaResolver(ServicioCategoria servicioCategoria) {
        this.servicioCategoria = servicioCategoria;
    }
    @PublicAccess(isPrivate = true)
    public List<Categoria> getcategorias() {

        return servicioCategoria.listarCategoria();
    }
}
