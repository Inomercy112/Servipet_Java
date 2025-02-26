package com.servipet.backend.Respuesta.Resolver;

import com.servipet.backend.Respuesta.DTO.RespuestaDTO;
import com.servipet.backend.Respuesta.Servicio.ServicioRespuesta;
import org.springframework.stereotype.Component;
import graphql.kickstart.tools.GraphQLMutationResolver;

@Component
public class RespuestaMutationResolver implements GraphQLMutationResolver {

    private final ServicioRespuesta servicioRespuesta;

    public RespuestaMutationResolver(ServicioRespuesta servicioRespuesta) {
        this.servicioRespuesta = servicioRespuesta;
    }

    // Método para registrar una respuesta
    public RespuestaDTO registrarRespuesta(RespuestaDTO respuestaInput) {
        return servicioRespuesta.registrarRespuesta(respuestaInput);
    }
}