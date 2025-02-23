package com.servipet.backend.Respuesta.Servicio;

import com.servipet.backend.Pregunta.DTO.PreguntasDTO;
import com.servipet.backend.Pregunta.Modelo.Pregunta;
import com.servipet.backend.Pregunta.Repositorio.RepositorioPreguntas;
import com.servipet.backend.Respuesta.DTO.RespuestaDTO;
import com.servipet.backend.Respuesta.Modelo.Respuesta;
import com.servipet.backend.Respuesta.Repositorio.RepositorioRespuesta;
import com.servipet.backend.Usuario.Modelo.Usuario;
import com.servipet.backend.Usuario.Repositorio.RepositorioUsuario;
import org.springframework.http.ResponseEntity;
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

    public ResponseEntity<?> registrarRespuesta(RespuestaDTO respuestaDTO) {
        Respuesta respuesta = new Respuesta();
        Optional<Pregunta> preguntaOptional = repositorioPreguntas.findById(respuestaDTO.getIdPreguntaDto().getIdDto());
        Optional<Usuario> usuarioOptional = repositorioUsuario.findById(respuestaDTO.getIdUsuarioDto());
        if (preguntaOptional.isPresent() && usuarioOptional.isPresent()) {
            respuestaDtoToEntity(respuestaDTO,respuesta,preguntaOptional.get());
            repositorioRespuesta.save(respuesta);
            return ResponseEntity.ok("Respuesta registrada");
        }else {
            if(usuarioOptional.isEmpty()){
                return ResponseEntity.badRequest().body("Usuario no encontrado");
            }else {
                return ResponseEntity.badRequest().body("Pregunta no encontrada");
            }
        }

    }
    public List <RespuestaDTO> consultarRespuesta(int id) {
        return repositorioRespuesta.findByIdPregunta_Id(id).stream().map(this::respuestaEntityToDTO).toList();
    }

    private RespuestaDTO respuestaEntityToDTO(Respuesta respuesta) {
        RespuestaDTO respuestaDTO = new RespuestaDTO();
        respuestaDTO.setIdUsuarioDto(respuesta.getIdUsuario());
        respuestaDTO.setIdDto(respuesta.getId());
        respuestaDTO.setDescripcionDto(respuesta.getDescripcion());
        respuestaDTO.setHoraCreacionDto(respuesta.getHoraCreacion());
        respuestaDTO.setFechaCreacionDto(respuestaDTO.getHoraCreacionDto());
        PreguntasDTO preguntasDTO = new PreguntasDTO();
        preguntasDTO.setIdDto(respuesta.getIdPregunta().getId());
        respuestaDTO.setIdPreguntaDto(preguntasDTO);
        return respuestaDTO;
    }
    private void respuestaDtoToEntity(RespuestaDTO respuestaDTO, Respuesta respuesta, Pregunta pregunta) {
        respuesta.setDescripcion(respuestaDTO.getDescripcionDto());
        respuesta.setIdUsuario(respuestaDTO.getIdUsuarioDto());
        respuesta.setIdPregunta(pregunta);
        respuesta.setFechaCeacion(respuestaDTO.getFechaCreacionDto());
        respuesta.setHoraCreacion(respuestaDTO.getHoraCreacionDto());
    }
}
