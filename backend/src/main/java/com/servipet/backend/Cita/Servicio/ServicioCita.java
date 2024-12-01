package com.servipet.backend.Cita.Servicio;

import com.servipet.backend.Cita.DTO.CitaDTO;
import com.servipet.backend.Cita.Modelo.Cita;
import com.servipet.backend.Cita.Modelo.EstadoCita;
import com.servipet.backend.Cita.Repositorio.RepositorioCita;
import com.servipet.backend.Cita.Repositorio.RepositorioEstadoCita;
import com.servipet.backend.Estado.Modelo.Estado;
import com.servipet.backend.Estado.Repositorio.RepositorioEstado;
import com.servipet.backend.Mascota.DTO.MascotaDTO;
import com.servipet.backend.Mascota.Modelo.Mascota;
import com.servipet.backend.Mascota.Repositorio.RepositorioMascota;

import com.servipet.backend.Usuario.Modelo.Usuario;
import com.servipet.backend.Usuario.Repositorio.RepositorioUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;


@Service
public class ServicioCita {

    private final RepositorioCita repositorioCita;

    private final RepositorioEstadoCita repositorioEstadoCita;

    private final RepositorioMascota repositorioMascota;
    private final RepositorioEstado repositorioEstado;
    private final RepositorioUsuario repositorioUsuario;

    @Autowired
    public ServicioCita(RepositorioCita repositorioCita, RepositorioEstadoCita repositorioEstadoCita, RepositorioMascota repositorioMascota, RepositorioEstado repositorioEstado, RepositorioUsuario repositorioUsuario) {
        this.repositorioCita = repositorioCita;
        this.repositorioEstadoCita = repositorioEstadoCita;
        this.repositorioMascota = repositorioMascota;
        this.repositorioEstado = repositorioEstado;
        this.repositorioUsuario = repositorioUsuario;
    }

    // Registro de cita
    public void RegistroCita(CitaDTO citaDTO) {
        System.out.println( "Servicio" + citaDTO.getMascotaAsisteDto().getIdDto());
        Mascota mascota = repositorioMascota.findById(citaDTO.getMascotaAsisteDto().getIdDto()).
                orElse(null);
        System.out.println(mascota);
        EstadoCita estadoCita = repositorioEstadoCita.findById(citaDTO.getEstadoCitaDto().getIdDto());

        Estado estado = repositorioEstado.findById(citaDTO.getEstadoCDto());
        System.out.println( estado);
        Cita cita = new Cita();
        ConvertirCitaEntity(citaDTO,cita,mascota,estadoCita,estado);
        repositorioCita.save(cita);
    }
    // Consultar todas las citas
    public List<CitaDTO> ConsultarCita() {
        return repositorioCita.findAll().stream().map(this::convertirCitaDTO).toList();
    }

    // Consultar cita específica
    public Optional<CitaDTO> ConsultaEspecifica(Integer id) {
        return repositorioCita.findById(id).map(this::convertirCitaDTO);
    }

    // Consultar citas de un usuario específico
    public List<CitaDTO> CitasUsuario(String id) {

        return repositorioCita.findByQuienAsiste(id).stream().map(this::convertirCitaDTO).toList();
    }
    public List<CitaDTO> CitasMascota(String id) {
        return repositorioCita.findByMascotaAsiste_Id(id).stream().map(this::convertirCitaDTO).toList();

    }


    // Aceptar cita
    public void aceptarCita(CitaDTO citaDTO) {
        Cita cita = repositorioCita.findById(citaDTO.getIdDto())
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));
        EstadoCita estadoAceptado = repositorioEstadoCita.findById(1L)
                .orElseThrow(() -> new RuntimeException("Estado de cita no encontrado"));
        cita.setEstadoCita(estadoAceptado);
        repositorioCita.save(cita);
    }

    // Cancelar cita
    public void cancelarCita(CitaDTO citaDTO) {
        Cita cita = repositorioCita.findById(citaDTO.getIdDto())
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));
        EstadoCita estadoCancelado = repositorioEstadoCita.findById(3L)
                .orElseThrow(() -> new RuntimeException("Estado de cita no encontrado"));
        cita.setEstadoCita(estadoCancelado);
        repositorioCita.save(cita);
    }

    // Actualizar diagnóstico de la cita
    public void actualizarDiagnostico(CitaDTO citaDTO, String diagnostico) {
        Cita cita = repositorioCita.findById(citaDTO.getIdDto())
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));
        cita.setDiagnostico(diagnostico);
        repositorioCita.save(cita);
    }

    // Actualizar fecha y hora de la cita
    public void actualizarFechaHora(CitaDTO citaDTO, String fechaString, String horaString) {
        Cita cita = repositorioCita.findById(citaDTO.getIdDto())
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));
        LocalDate fecha = LocalDate.parse(fechaString);
        LocalTime hora = LocalTime.parse(horaString);
        cita.setFechaCita(fecha);
        cita.setHoraCita(hora);
        repositorioCita.save(cita);
    }
    private CitaDTO convertirCitaDTO(Cita cita) {
        CitaDTO citaDTO = new CitaDTO();
        citaDTO.setIdDto(cita.getId());
        citaDTO.setRazonDto(cita.getRazon());
        citaDTO.setDiagnosticoDto(cita.getDiagnostico());
        citaDTO.setFechaCitaDto(cita.getFechaCita());
        citaDTO.setHoraCitaDto(cita.getHoraCita());
        if(cita.getQuienAsiste() != null){
            Usuario usuarioAsistente = repositorioUsuario.findById(cita.getQuienAsiste()).orElseThrow();
            citaDTO.setQuienAsisteDto(usuarioAsistente.getNombreUsuario());
        }
        if (cita.getQuienAtiende() != null) {
            Optional<Usuario> usuarioAtiendeOpt = repositorioUsuario.findById(cita.getQuienAtiende());
            if (usuarioAtiendeOpt.isPresent()) {
                Usuario usuarioAtiende = usuarioAtiendeOpt.get();
                citaDTO.setQuienAsisteDto(usuarioAtiende.getNombreUsuario());
            } else {
                citaDTO.setQuienAsisteDto("");
            }
        } else {
            citaDTO.setQuienAsisteDto("");
        }


        if(cita.getMascotaAsiste() != null) {
            MascotaDTO mascotaDTO = new MascotaDTO();
            mascotaDTO.setIdDto(cita.getMascotaAsiste().getId());
            mascotaDTO.setNombreMascotaDto(cita.getMascotaAsiste().getNombreMascota());
            citaDTO.setMascotaAsisteDto(mascotaDTO);
        }
        if(cita.getEstadoCita() != null) {
            CitaDTO.EstadoCitaDto estadoCitaDto = new CitaDTO.EstadoCitaDto();
            estadoCitaDto.setNombreEstadoCitaDto(cita.getEstadoCita().getNombreEstadoCita());
            estadoCitaDto.setIdDto(cita.getEstadoCita().getId());
            citaDTO.setEstadoCitaDto(estadoCitaDto);
        }

        citaDTO.setEstadoCDto(cita.getEstadoC() != null ? cita.getEstadoC().getId() : 0 );
        return citaDTO;
    }
    private void ConvertirCitaEntity(CitaDTO citaDTO, Cita cita, Mascota mascota, EstadoCita estadoCita, Estado estadoC) {
        cita.setRazon(citaDTO.getRazonDto());
        cita.setDiagnostico(citaDTO.getDiagnosticoDto());
        cita.setFechaCita(citaDTO.getFechaCitaDto());
        cita.setHoraCita(citaDTO.getHoraCitaDto());
        cita.setQuienAsiste(citaDTO.getQuienAsisteDto());
        cita.setQuienAtiende(citaDTO.getQuienAtiendeDto());
        cita.setMascotaAsiste(mascota);
        cita.setEstadoCita(estadoCita);
        cita.setEstadoC(estadoC);

    }
}
