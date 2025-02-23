package com.servipet.backend.Puntuaciones.Servicio;


import com.servipet.backend.Puntuaciones.Modelo.Puntuacion;
import com.servipet.backend.Puntuaciones.DTO.PuntuacionDTO;
import com.servipet.backend.Puntuaciones.Repositorio.RepositorioPuntuacion;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ServicioPuntuacion {
    private final RepositorioPuntuacion repositorioPuntuacion;
    public ServicioPuntuacion(RepositorioPuntuacion repositorioPuntuacion) {
       this.repositorioPuntuacion = repositorioPuntuacion;
    }
    public void registrarPuntuacion(PuntuacionDTO puntuacionDTO) {
        Puntuacion puntuacion = new Puntuacion();
        puntuacionDtoToEntity(puntuacionDTO, puntuacion);
        repositorioPuntuacion.save(puntuacion);

    }
    public Optional <PuntuacionDTO> buscarPuntuacion(String id) {
        return repositorioPuntuacion.findByUsuarioPuntuacion(id).map(this::puntuacionEntityToDto);
    }
    public PuntuacionDTO puntuacionEntityToDto(Puntuacion puntuacion) {
        PuntuacionDTO puntuacionDTO = new PuntuacionDTO();
        puntuacionDTO.setIdDto(puntuacion.getId());
        puntuacionDTO.setComentarioPuntuacionDto(puntuacion.getComentarioPuntuacion());
        puntuacionDTO.setUsuarioPuntuacionDto(puntuacion.getUsuarioPuntuacion());
        puntuacionDTO.setCantidadPuntuacionDto(puntuacion.getCantidadPuntuacion());
        return puntuacionDTO;

    }
    public void puntuacionDtoToEntity (PuntuacionDTO puntuacionDTO, Puntuacion puntuacion) {
        puntuacion.setCantidadPuntuacion(puntuacion.getCantidadPuntuacion());
        puntuacion.setComentarioPuntuacion(puntuacion.getComentarioPuntuacion());
        puntuacion.setUsuarioPuntuacion(puntuacion.getUsuarioPuntuacion());
    }
}
