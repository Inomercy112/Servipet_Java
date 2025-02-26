package com.servipet.backend.Respuesta.Resolver;

import com.servipet.backend.Respuesta.DTO.RespuestaDTO;
import com.servipet.backend.Respuesta.Servicio.ServicioRespuesta;
import org.springframework.stereotype.Component;
import graphql.kickstart.tools.GraphQLQueryResolver;
import java.util.List;

@Component
public class RespuestaQueryResolver implements GraphQLQueryResolver {

    private final ServicioRespuesta servicioRespuesta;

    public RespuestaQueryResolver(ServicioRespuesta servicioRespuesta) {
        this.servicioRespuesta = servicioRespuesta;
    }

    // Método para obtener respuestas por pregunta
    public List<RespuestaDTO> getRespuestasPorPregunta(int idPregunta) {
        return servicioRespuesta.consultarRespuesta(idPregunta);
    }
}