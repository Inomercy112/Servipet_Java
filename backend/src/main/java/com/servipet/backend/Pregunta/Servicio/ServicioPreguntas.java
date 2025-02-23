package com.servipet.backend.Pregunta.Servicio;


import com.servipet.backend.Pregunta.DTO.PreguntasDTO;
import com.servipet.backend.Pregunta.Modelo.Pregunta;
import com.servipet.backend.Pregunta.Repositorio.RepositorioPreguntas;
import com.servipet.backend.Producto.Modelo.Producto;
import com.servipet.backend.Producto.Repositorio.RepositorioProducto;
import com.servipet.backend.Usuario.Modelo.Usuario;
import com.servipet.backend.Usuario.Repositorio.RepositorioUsuario;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServicioPreguntas {
    private final RepositorioPreguntas repositorioPreguntas;
    private final RepositorioUsuario repositorioUsuario;
    private final RepositorioProducto repositorioProducto;
    public ServicioPreguntas( RepositorioPreguntas repositorioPreguntas, RepositorioUsuario repositorioUsuario, RepositorioProducto repositorioProducto ) {
        this.repositorioPreguntas = repositorioPreguntas;
        this.repositorioUsuario = repositorioUsuario;
        this.repositorioProducto = repositorioProducto;
    }
    public ResponseEntity<?> registrarPregunta(PreguntasDTO preguntasDTO) {
        Pregunta pregunta = new Pregunta();
        Optional<Usuario> usuario =  repositorioUsuario.findById(preguntasDTO.getIdUsuarioDto());
        Optional<Producto> producto =  repositorioProducto.findById(preguntasDTO.getIdProductoDto());
        if(usuario.isPresent() && producto.isPresent()) {
            preguntasDtoToEntity(preguntasDTO, pregunta);
            repositorioPreguntas.save(pregunta);
            return ResponseEntity.ok("pregunta registrada");
        }else {
            if(producto.isEmpty()){
                return ResponseEntity.badRequest().body("No se encontro el producto");
            }else {
                return ResponseEntity.badRequest().body("No se encontro el usuario");
            }
        }

    }

    public List<PreguntasDTO> obtenerPreguntas(String idProducto) {
        return repositorioPreguntas.findByIdProducto(idProducto).stream().map(this::preguntasEntityToDTO).toList();
    }


    private PreguntasDTO preguntasEntityToDTO( Pregunta pregunta) {
        PreguntasDTO preguntasDTO = new PreguntasDTO();
        preguntasDTO.setIdDto( pregunta.getId() );
        preguntasDTO.setDescripcionDto( pregunta.getDescripcion() );
        preguntasDTO.setIdUsuarioDto( pregunta.getIdUsuario() );
        preguntasDTO.setIdProductoDto( pregunta.getIdProducto() );
        preguntasDTO.setHoraCreacionDto( pregunta.getHoraCreacion() );
        preguntasDTO.setFechaCreacionDto( pregunta.getFechaCreacion() );
        return preguntasDTO;
    }
    private void preguntasDtoToEntity( PreguntasDTO preguntasDTO, Pregunta pregunta) {
        pregunta.setDescripcion( preguntasDTO.getDescripcionDto() );
        pregunta.setIdUsuario( preguntasDTO.getIdUsuarioDto() );
        pregunta.setIdProducto( preguntasDTO.getIdProductoDto() );
        pregunta.setHoraCreacion( preguntasDTO.getHoraCreacionDto() );
        pregunta.setFechaCreacion( preguntasDTO.getFechaCreacionDto() );

    }
}
