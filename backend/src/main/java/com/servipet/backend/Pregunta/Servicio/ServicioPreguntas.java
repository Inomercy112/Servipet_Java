package com.servipet.backend.Pregunta.Servicio;

import com.servipet.backend.Pregunta.DTO.PreguntasDTO;
import com.servipet.backend.Pregunta.Modelo.Pregunta;
import com.servipet.backend.Pregunta.Repositorio.RepositorioPreguntas;
import com.servipet.backend.Producto.Modelo.ProductoMongo;
import com.servipet.backend.Producto.Repositorio.RepositorioProducto;
import com.servipet.backend.Respuesta.DTO.RespuestaDTO;
import com.servipet.backend.Usuario.Modelo.Usuario;
import com.servipet.backend.Usuario.Repositorio.RepositorioUsuario;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ServicioPreguntas {
    private final RepositorioPreguntas repositorioPreguntas;
    private final RepositorioUsuario repositorioUsuario;
    private final RepositorioProducto repositorioProducto;

    public ServicioPreguntas(RepositorioPreguntas repositorioPreguntas, RepositorioUsuario repositorioUsuario, RepositorioProducto repositorioProducto) {
        this.repositorioPreguntas = repositorioPreguntas;
        this.repositorioUsuario = repositorioUsuario;
        this.repositorioProducto = repositorioProducto;
    }

    // Método para registrar una pregunta
    public PreguntasDTO registrarPregunta(PreguntasDTO preguntasDTO) {
        Pregunta pregunta = new Pregunta();
        Optional<Usuario> usuario = repositorioUsuario.findById(preguntasDTO.getIdUsuarioDto());
        Optional<ProductoMongo> producto = repositorioProducto.findById(preguntasDTO.getIdProductoDto());

        if (usuario.isEmpty()) {
            throw new RuntimeException("No se encontró el usuario con ID: " + preguntasDTO.getIdUsuarioDto());
        }
        if (producto.isEmpty()) {
            throw new RuntimeException("No se encontró el producto con ID: " + preguntasDTO.getIdProductoDto());
        }

        // Convertir DTO a entidad y guardar
        preguntasDtoToEntity(preguntasDTO, pregunta);
        repositorioPreguntas.save(pregunta);

        // Devolver el DTO de la pregunta registrada
        return preguntasEntityToDTO(pregunta);
    }

    // Método para obtener preguntas por producto
    @Transactional

    public List<PreguntasDTO> obtenerPreguntas(String idProducto) {
        return repositorioPreguntas.findByIdProducto(idProducto).stream()
                .map(this::preguntasEntityToDTO)
                .toList();
    }
    @Transactional
    public List<PreguntasDTO> obtenerPreguntasPorVendedor(String idVendedor) {
        // Primero obtenemos los productos del vendedor desde MongoDB
        List<ProductoMongo> productosVendedor = repositorioProducto.findByDuenoProducto(idVendedor);

        // Extraemos los IDs de los productos del vendedor
        List<String> idsProductos = productosVendedor.stream()
                .map(ProductoMongo::getId)
                .collect(Collectors.toList());

        // Ahora obtenemos las preguntas relacionadas con estos productos en la base de datos SQL
        return repositorioPreguntas.findByIdProductoIn(idsProductos).stream().map(this::preguntasEntityToDTO).toList();
    }

    // Método para convertir entidad a DTO

    private PreguntasDTO preguntasEntityToDTO(Pregunta pregunta) {
        PreguntasDTO preguntasDTO = new PreguntasDTO();
        preguntasDTO.setIdDto(pregunta.getId());
        preguntasDTO.setDescripcionDto(pregunta.getDescripcion());
        preguntasDTO.setIdUsuarioDto(pregunta.getIdUsuario());
        preguntasDTO.setIdProductoDto(pregunta.getIdProducto());
        if (pregunta.getRespuestas() != null) {
            List<RespuestaDTO> respuestasDto = pregunta.getRespuestas().stream()
                    .map(respuesta -> new RespuestaDTO(
                            respuesta.getId(),
                            preguntasDTO,
                            respuesta.getIdUsuario(),
                            respuesta.getDescripcion(),
                            respuesta.getFechaCreacion(),
                            respuesta.getHoraCreacion()
                    ))
                    .toList();
            preguntasDTO.setRespuestasDto(respuestasDto);
        }
        preguntasDTO.setHoraCreacionDto(pregunta.getHoraCreacion());
        preguntasDTO.setFechaCreacionDto(pregunta.getFechaCreacion());
        return preguntasDTO;
    }

    // Método para convertir DTO a entidad
    private void preguntasDtoToEntity(PreguntasDTO preguntasDTO, Pregunta pregunta) {
        pregunta.setDescripcion(preguntasDTO.getDescripcionDto());
        pregunta.setIdUsuario(preguntasDTO.getIdUsuarioDto());
        pregunta.setIdProducto(preguntasDTO.getIdProductoDto());
        pregunta.setHoraCreacion(preguntasDTO.getHoraCreacionDto());
        pregunta.setFechaCreacion(preguntasDTO.getFechaCreacionDto());
    }
}