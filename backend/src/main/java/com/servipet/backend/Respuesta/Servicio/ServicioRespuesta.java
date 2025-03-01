package com.servipet.backend.Respuesta.Servicio;

import com.servipet.backend.Pregunta.DTO.PreguntasDTO;
import com.servipet.backend.Pregunta.Modelo.Pregunta;
import com.servipet.backend.Pregunta.Repositorio.RepositorioPreguntas;
import com.servipet.backend.Respuesta.DTO.RespuestaDTO;
import com.servipet.backend.Respuesta.Modelo.Respuesta;
import com.servipet.backend.Respuesta.Repositorio.RepositorioRespuesta;
import com.servipet.backend.Usuario.Modelo.Usuario;
import com.servipet.backend.Usuario.Repositorio.RepositorioUsuario;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServicioRespuesta {
    private final RepositorioRespuesta repositorioRespuesta;
    private final RepositorioPreguntas repositorioPreguntas;
    private final RepositorioUsuario repositorioUsuario;

    public ServicioRespuesta(RepositorioRespuesta repositorioRespuesta, RepositorioPreguntas repositorioPreguntas, RepositorioUsuario repositorioUsuario) {
        this.repositorioRespuesta = repositorioRespuesta;
        this.repositorioPreguntas = repositorioPreguntas;
        this.repositorioUsuario = repositorioUsuario;
    }

    // Método para registrar una respuesta
    public RespuestaDTO registrarRespuesta(RespuestaDTO respuestaDTO) {
        System.out.println(respuestaDTO);
        Respuesta respuesta = new Respuesta();
        Optional<Pregunta> preguntaOptional = repositorioPreguntas.findById(respuestaDTO.getIdPreguntaDto().getIdDto());
        Optional<Usuario> usuarioOptional = repositorioUsuario.findById(respuestaDTO.getIdUsuarioDto());

        if (preguntaOptional.isEmpty()) {
            throw new RuntimeException("No se encontró la pregunta con ID: " + respuestaDTO.getIdPreguntaDto().getIdDto());
        }
        if (usuarioOptional.isEmpty()) {
            throw new RuntimeException("No se encontró el usuario con ID: " + respuestaDTO.getIdUsuarioDto());
        }

        // Convertir DTO a entidad y guardar
        respuestaDtoToEntity(respuestaDTO, respuesta, preguntaOptional.get());
        repositorioRespuesta.save(respuesta);

        // Devolver el DTO de la respuesta registrada
        return respuestaEntityToDTO(respuesta);
    }

    // Método para obtener respuestas por pregunta
    public List<RespuestaDTO> consultarRespuesta(int idPregunta) {
        return repositorioRespuesta.findByIdPregunta_Id(idPregunta).stream()
                .map(this::respuestaEntityToDTO)
                .toList();
    }

    // Método para convertir entidad a DTO
    private RespuestaDTO respuestaEntityToDTO(Respuesta respuesta) {
        RespuestaDTO respuestaDTO = new RespuestaDTO();
        respuestaDTO.setIdDto(respuesta.getId());
        respuestaDTO.setDescripcionDto(respuesta.getDescripcion());
        respuestaDTO.setIdUsuarioDto(respuesta.getIdUsuario());
        respuestaDTO.setHoraCreacionDto(respuesta.getHoraCreacion());
        respuestaDTO.setFechaCreacionDto(respuesta.getFechaCreacion());

        PreguntasDTO preguntasDTO = new PreguntasDTO();
        preguntasDTO.setIdDto(respuesta.getIdPregunta().getId());
        respuestaDTO.setIdPreguntaDto(preguntasDTO);

        return respuestaDTO;
    }

    // Método para convertir DTO a entidad
    private void respuestaDtoToEntity(RespuestaDTO respuestaDTO, Respuesta respuesta, Pregunta pregunta) {
        respuesta.setDescripcion(respuestaDTO.getDescripcionDto());
        respuesta.setIdUsuario(respuestaDTO.getIdUsuarioDto());
        respuesta.setIdPregunta(pregunta);
        respuesta.setFechaCreacion(respuestaDTO.getFechaCreacionDto());
        respuesta.setHoraCreacion(respuestaDTO.getHoraCreacionDto());
    }
}