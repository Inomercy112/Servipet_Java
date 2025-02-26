package com.servipet.backend.Pregunta.Resolver;

import com.servipet.backend.Pregunta.DTO.PreguntasDTO;
import com.servipet.backend.Pregunta.Servicio.ServicioPreguntas;
import org.springframework.stereotype.Component;
import graphql.kickstart.tools.GraphQLMutationResolver;

@Component
public class PreguntaMutationResolver implements GraphQLMutationResolver {

    private final ServicioPreguntas servicioPreguntas;

    public PreguntaMutationResolver(ServicioPreguntas servicioPreguntas) {
        this.servicioPreguntas = servicioPreguntas;
    }

    // Método para registrar una pregunta
    public PreguntasDTO registrarPregunta(PreguntasDTO preguntaInput) {
        return servicioPreguntas.registrarPregunta(preguntaInput);
    }
}