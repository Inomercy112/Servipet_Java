package com.servipet.backend.Pregunta.Resolver;

import com.servipet.backend.Etiquetas.PublicAccess;
import com.servipet.backend.Pregunta.DTO.PreguntasDTO;
import com.servipet.backend.Pregunta.Modelo.Pregunta;
import com.servipet.backend.Pregunta.Servicio.ServicioPreguntas;
import com.servipet.backend.Producto.DTO.ProductoDTO;
import com.servipet.backend.Producto.Modelo.ProductoMongo;
import com.servipet.backend.Producto.Servicio.ServicioProducto;
import org.springframework.stereotype.Component;
import graphql.kickstart.tools.GraphQLQueryResolver;
import java.util.List;
import java.util.Optional;

@Component
public class PreguntaQueryResolver implements GraphQLQueryResolver {

    private final ServicioPreguntas servicioPreguntas;
    private final ServicioProducto servicioProducto;

    public PreguntaQueryResolver(ServicioPreguntas servicioPreguntas, ServicioProducto servicioProducto) {
        this.servicioPreguntas = servicioPreguntas;
        this.servicioProducto = servicioProducto;
    }

    // Método para obtener preguntas por producto
    public List<PreguntasDTO> getPreguntasPorProducto(String idProducto) {
        return servicioPreguntas.obtenerPreguntas(idProducto);
    }

    public List<PreguntasDTO> getPreguntasPorProductoYVendedor(String vendedorId) {
        List<PreguntasDTO> preguntas = servicioPreguntas.obtenerPreguntasPorVendedor(vendedorId);

        // Para cada pregunta, obtener el producto relacionado
        for (PreguntasDTO pregunta : preguntas) {
             Optional<ProductoDTO> producto = servicioProducto.buscarProductoId(pregunta.getIdProductoDto());
             producto.ifPresent(pregunta::setProductoDto);
        }

        return preguntas;
    }

}