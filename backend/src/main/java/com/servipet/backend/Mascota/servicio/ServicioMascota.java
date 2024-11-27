package com.servipet.backend.Mascota.servicio;

import com.servipet.backend.Estado.DTO.EstadoDTO;
import com.servipet.backend.Estado.Repositorio.RepositorioEstado;
import com.servipet.backend.Mascota.DTO.MascotaDTO;
import com.servipet.backend.Mascota.clase.Mascota;
import com.servipet.backend.Mascota.clase.TamañoMascota;
import com.servipet.backend.Mascota.clase.TipoDeMascota;

import com.servipet.backend.Mascota.repositorio.RepositorioMascota;
import com.servipet.backend.Mascota.repositorio.RepositorioTamano;
import com.servipet.backend.Mascota.repositorio.RepositorioTipo;
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

    public Optional<Mascota> consultaEsp(String id){
        return repositorioMascota.findById(id);

    }

    public List<TipoDeMascota> consultarTipo(){
        return repositorioTipo.findAll();
    }

    public void guardarMascota(MascotaDTO mascotaDTO){
        TipoDeMascota tipo = repositorioTipo.findById(mascotaDTO.getTipoDeMascotaDto().getIdTipoDeMascotaDto());
        TamañoMascota tamano = repositorioTamano.findById(mascotaDTO.getTamanoMascotaDto().getIdTamanoMascotaDto());
        Estado estado = repositorioEstado.findById(mascotaDTO.getEstadoMascotaDto());
        Mascota mascota = new Mascota();
        ConvertirMascotaEntity(mascotaDTO, mascota, tamano, tipo, estado);
        repositorioMascota.save(mascota);
    }

    public List<Mascota> consultarMascota(String id ){

        return  repositorioMascota.findByDuenoMascota(id);

    }
    public void actualizarMascota(Mascota mascota){
        repositorioMascota.save(mascota);
    }

    public void desactivarMascota(Mascota mascota){
        Estado estado = mascota.getEstadoMascota();
        mascota.setEstadoMascota(estado);
        repositorioMascota.save(mascota);
    }

    private MascotaDTO ConvertirMascotaDTO(Mascota mascota){
        MascotaDTO mascotaDTO = new MascotaDTO();
        mascotaDTO.setIdDto(mascota.getId());
        mascotaDTO.setNombreMascotaDto(mascota.getNombreMascota());
        mascotaDTO.setFechaNacimientoMascotaDto(mascota.getFechaNacimientoMascota());
        mascotaDTO.setPesoMascotaDto(mascota.getPesoMascota());
        mascotaDTO.setRazaMascotaDto(mascota.getRazaMascota());
        mascotaDTO.setDuenoMascotaDto(mascota.getDuenoMascota());
        MascotaDTO.TipoDeMascotaDTO tipoDTO = new MascotaDTO.TipoDeMascotaDTO();
        tipoDTO.setIdTipoDeMascotaDto(mascota.getTipoMascota().getId());
        tipoDTO.setNombreTipoMascotaDto(mascota.getTipoMascota().getNombreTipo());
        mascotaDTO.setTipoDeMascotaDto(tipoDTO);
        MascotaDTO.TamanoMascotaDTO tamanoDTO = new MascotaDTO.TamanoMascotaDTO();
        tamanoDTO.setIdTamanoMascotaDto(mascota.getTamañoMascota().getId());
        tamanoDTO.setNombreTamanoMascotaDto(mascota.getTamañoMascota().getNombreTamaño());
        mascotaDTO.setTamanoMascotaDto(tamanoDTO);
        mascotaDTO.setEstadoMascotaDto(mascota.getEstadoMascota().getId());
        return mascotaDTO;

    }
    private void ConvertirMascotaEntity(@RequestBody MascotaDTO mascotaDTO, Mascota mascota, TamañoMascota tamano , TipoDeMascota tipo, Estado estado){
        mascota.setId(mascotaDTO.getIdDto());
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
