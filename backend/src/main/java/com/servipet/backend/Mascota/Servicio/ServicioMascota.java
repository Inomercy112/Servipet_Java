package com.servipet.backend.Mascota.Servicio;

import com.servipet.backend.Estado.Repositorio.RepositorioEstado;
import com.servipet.backend.Mascota.DTO.MascotaDTO;
import com.servipet.backend.Mascota.Modelo.Mascota;
import com.servipet.backend.Mascota.Modelo.TamañoMascota;
import com.servipet.backend.Mascota.Modelo.TipoDeMascota;

import com.servipet.backend.Mascota.Repositorio.RepositorioMascota;
import com.servipet.backend.Mascota.Repositorio.RepositorioTamano;
import com.servipet.backend.Mascota.Repositorio.RepositorioTipo;
import com.servipet.backend.Estado.Modelo.Estado;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Service
public class ServicioMascota {
    private final RepositorioMascota repositorioMascota;
    private final RepositorioTipo repositorioTipo;
    private final RepositorioTamano repositorioTamano;
    private final RepositorioEstado repositorioEstado;

    @Autowired
    public ServicioMascota(RepositorioMascota repositorioMascota, RepositorioTipo repositorioTipo, RepositorioTamano repositorioTamano, RepositorioEstado repositorioEstado) {
        this.repositorioMascota = repositorioMascota;
        this.repositorioTipo = repositorioTipo;
        this.repositorioTamano = repositorioTamano;
        this.repositorioEstado = repositorioEstado;
    }

    public Optional<MascotaDTO> consultaEsp(String id){
        return repositorioMascota.findById(id)
                .map(this::ConvertirMascotaDTO);

    }

    public List<TipoDeMascota> consultarTipo(){
        return repositorioTipo.findAll();
    }

    public void guardarMascota(MascotaDTO mascotaDTO){
        TipoDeMascota tipo = repositorioTipo.findById(mascotaDTO.getTipoMascotaDto().getIdDto());
        TamañoMascota tamano = repositorioTamano.findById(mascotaDTO.getTamanoMascotaDto().getIdDto());
        Estado estado = repositorioEstado.findById(mascotaDTO.getEstadoMascotaDto());
        Optional<Mascota> mascotaOptional = repositorioMascota.findById(mascotaDTO.getIdDto());
        Mascota mascota ;
        if(mascotaOptional.isPresent()){
            mascota = mascotaOptional.get();
            ConvertirMascotaEntity(mascotaDTO, mascota, tamano, tipo, estado);

        }else{
            mascota = new Mascota();
            ConvertirMascotaEntity(mascotaDTO, mascota, tamano, tipo, estado);
        }

        repositorioMascota.save(mascota);
    }

    public List<MascotaDTO> consultarMascota(String id ){
        Estado estadoOptional = repositorioEstado.findById(1);

        return repositorioMascota.findByDuenoMascotaAndEstadoMascota(id, estadoOptional )
                .stream()
                .map(this::ConvertirMascotaDTO)
                .toList();

    }


    public void desactivarMascota(MascotaDTO mascotaDTO){
        Optional<Mascota> mascotaOptional = repositorioMascota.findById(mascotaDTO.getIdDto());
        if(mascotaOptional.isPresent()){
            Mascota mascota = mascotaOptional.get();

            Optional< Estado> estadoOptional = Optional.ofNullable(repositorioEstado.findById(2));
            if(estadoOptional.isPresent()){
                mascota.setEstadoMascota(estadoOptional.get());
                repositorioMascota.save(mascota);
            }else {
                throw new RuntimeException("Estado no encontrado");
            }

        }else {
            throw new RuntimeException("Mascota no encontrada");
        }
    }

    private MascotaDTO ConvertirMascotaDTO(Mascota mascota){
        MascotaDTO mascotaDTO = new MascotaDTO();
        mascotaDTO.setIdDto(mascota.getId());
        mascotaDTO.setNombreMascotaDto(mascota.getNombreMascota());
        mascotaDTO.setFechaNacimientoMascotaDto(mascota.getFechaNacimientoMascota());
        mascotaDTO.setPesoMascotaDto(mascota.getPesoMascota());
        mascotaDTO.setRazaMascotaDto(mascota.getRazaMascota());
        mascotaDTO.setDuenoMascotaDto(mascota.getDuenoMascota());
        mascotaDTO.setAntecedentesMascotaDto(mascota.getAntecedentesMascota());
        MascotaDTO.TipoDeMascotaDTO tipoDTO = new MascotaDTO.TipoDeMascotaDTO();
        tipoDTO.setIdDto(mascota.getTipoMascota().getId());
        tipoDTO.setNombreTipoMascotaDto(mascota.getTipoMascota().getNombreTipo());
        mascotaDTO.setTipoMascotaDto(tipoDTO);
        MascotaDTO.TamanoMascotaDTO tamanoDTO = new MascotaDTO.TamanoMascotaDTO();
        tamanoDTO.setIdDto(mascota.getTamañoMascota().getId());
        tamanoDTO.setNombreTamanoMascotaDto(mascota.getTamañoMascota().getNombreTamaño());
        mascotaDTO.setTamanoMascotaDto(tamanoDTO);
        mascotaDTO.setEstadoMascotaDto(mascota.getEstadoMascota().getId());
        return mascotaDTO;

    }
    private void ConvertirMascotaEntity(MascotaDTO mascotaDTO, Mascota mascota, TamañoMascota tamano , TipoDeMascota tipo, Estado estado){
        mascota.setNombreMascota(mascotaDTO.getNombreMascotaDto());
        mascota.setFechaNacimientoMascota(mascotaDTO.getFechaNacimientoMascotaDto());
        mascota.setPesoMascota(mascotaDTO.getPesoMascotaDto());
        mascota.setRazaMascota(mascotaDTO.getRazaMascotaDto());
        mascota.setAntecedentesMascota(mascotaDTO.getAntecedentesMascotaDto());
        mascota.setDuenoMascota(mascotaDTO.getDuenoMascotaDto());
        mascota.setTipoMascota(tipo);
        mascota.setTamañoMascota(tamano);
        mascota.setEstadoMascota(estado);
    }
}
