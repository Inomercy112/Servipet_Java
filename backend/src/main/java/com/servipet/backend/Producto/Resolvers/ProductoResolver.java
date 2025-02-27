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
    public List<ProductoDTO> getProductoByCategoria(String categoria) {
        try {
            return servicioProducto.buscarProductosPorCategoria(categoria);
        }catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    @PublicAccess(isPrivate = false)
    public List<ProductoDTO> getproductoByNombre(String nombre) {
        System.out.println(nombre + "nombre de entrada");
        String nombreOriginal = nombre.replace("-", " ");
        System.out.println(nombreOriginal+"nombre original ");
        try {
            return servicioProducto.buscarProductosPorNombre(nombreOriginal);
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
