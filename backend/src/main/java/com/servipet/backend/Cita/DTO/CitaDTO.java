package com.servipet.backend.Cita.DTO;

import com.servipet.backend.Mascota.DTO.MascotaDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CitaDTO {
    private int idDto;
    private String razonDto;
    private String diagnosticoDto;
    private LocalDate fechaCitaDto;
    private LocalTime horaCitaDto;
    private String quienAsisteDto;
    private String quienAtiendeDto;
    private MascotaDTO mascotaAsisteDto;
    private EstadoCitaDto estadoCitaDto;
    private int estadoCDto;
    @Data
    public static class EstadoCitaDto {
        private int idDto;
        private String nombreEstadoCitaDto;
    }
}

