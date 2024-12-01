package com.servipet.backend.DatosDomicilio.Servicio;

import com.servipet.backend.DatosDomicilio.DTO.DatosDomicilioDTO;
import com.servipet.backend.DatosDomicilio.Modelo.DatosDomicilio;
import com.servipet.backend.DatosDomicilio.Repositorio.RepositorioDatosDomicilio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServicioDatosDomicilio {
    private final RepositorioDatosDomicilio repositorioDatosDomicilio;
    @Autowired
    public ServicioDatosDomicilio(RepositorioDatosDomicilio repositorioDatosDomicilio) {
        this.repositorioDatosDomicilio = repositorioDatosDomicilio;
    }
    public void registrarDatosDomicilio(DatosDomicilioDTO datosDomicilioDTO) {
        DatosDomicilio datosDomicilio = new DatosDomicilio();
        convertirDatosDomicilioEntity(datosDomicilioDTO, datosDomicilio);
        repositorioDatosDomicilio.save(datosDomicilio);

    }
    public List<DatosDomicilioDTO> listarDatosDomicilio(DatosDomicilioDTO datosDomicilioDTO) {

        return repositorioDatosDomicilio.findByDuenoDomicilio(datosDomicilioDTO.getDuenoDomicilioDto())
                .stream()
                .map(this::convertirDatosDomicilioDto)
                .toList();
    }
    public Optional<DatosDomicilioDTO> buscarDatosDomicilioPorId(String id) {
        return repositorioDatosDomicilio.findById(id).map(this::convertirDatosDomicilioDto);
    }
    private DatosDomicilioDTO convertirDatosDomicilioDto(DatosDomicilio datosDomicilio) {
        DatosDomicilioDTO datosDomicilioDTO = new DatosDomicilioDTO();
        datosDomicilioDTO.setIdDto(datosDomicilio.getId());
        datosDomicilioDTO.setNombreDto(datosDomicilio.getNombre());
        datosDomicilioDTO.setLocalidadDto(datosDomicilio.getLocalidad());
        datosDomicilioDTO.setBarrioDto(datosDomicilio.getBarrio());
        datosDomicilioDTO.setDireccionDto(datosDomicilio.getDireccion());
        datosDomicilioDTO.setTelefonoDto(datosDomicilio.getTelefono());
        datosDomicilioDTO.setPisoDepartamentoDto(datosDomicilio.getPisoDepartamento());
        datosDomicilioDTO.setCasaOTrabajoDto(datosDomicilio.getCasaOTrabajo());
        datosDomicilioDTO.setAdicionalesDto(datosDomicilio.getAdicionales());
        return datosDomicilioDTO;
    }
    private void convertirDatosDomicilioEntity(DatosDomicilioDTO datosDomicilioDTO, DatosDomicilio datosDomicilio) {
        datosDomicilio.setDuenoDomicilio(datosDomicilioDTO.getDuenoDomicilioDto());
        datosDomicilio.setNombre(datosDomicilioDTO.getNombreDto());
        datosDomicilio.setLocalidad(datosDomicilioDTO.getLocalidadDto());
        datosDomicilio.setBarrio(datosDomicilioDTO.getBarrioDto());
        datosDomicilio.setDireccion(datosDomicilioDTO.getDireccionDto());
        datosDomicilio.setTelefono(datosDomicilioDTO.getTelefonoDto());
        datosDomicilio.setPisoDepartamento(datosDomicilioDTO.getPisoDepartamentoDto());
        datosDomicilio.setCasaOTrabajo(datosDomicilioDTO.getCasaOTrabajoDto());
        datosDomicilio.setAdicionales(datosDomicilioDTO.getAdicionalesDto());

    }
}
