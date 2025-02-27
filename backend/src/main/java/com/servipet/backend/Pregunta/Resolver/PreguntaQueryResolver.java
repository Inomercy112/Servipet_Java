package com.servipet.backend.Pregunta.Resolver;

import com.servipet.backend.Etiquetas.PublicAccess;
import com.servipet.backend.Pregunta.DTO.PreguntasDTO;
import com.servipet.backend.Pregunta.Servicio.ServicioPreguntas;
import org.springframework.stereotype.Component;
import graphql.kickstart.tools.GraphQLQueryResolver;
import java.util.List;

@Component
public class PreguntaQueryResolver implements GraphQLQueryResolver {

    private final ServicioPreguntas servicioPreguntas;

    public PreguntaQueryResolver(ServicioPreguntas servicioPreguntas) {
        this.servicioPreguntas = servicioPreguntas;
    }

    // Método para obtener preguntas por producto
    public List<PreguntasDTO> getPreguntasPorProducto(String idProducto) {
        return servicioPreguntas.obtenerPreguntas(idProducto);
    }

}