package com.servipet.backend.Mascota.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MascotaDTO {
    private String idDto ;
    private String nombreMascotaDto;
    private LocalDate fechaNacimientoMascotaDto;
    private Integer PesoMascotaDto;
    private String razaMascotaDto;
    private String antecedentesMascotaDto;
    private String duenoMascotaDto;
    private TipoDeMascotaDTO tipoDeMascotaDto;
    private TamanoMascotaDTO tamanoMascotaDto;
    private int estadoMascotaDto;

    @Data
    public static class TamanoMascotaDTO {
        private int idTamanoMascotaDto;
        private String nombreTamanoMascotaDto;
    }

    @Data
    public static class TipoDeMascotaDTO {
        private int idTipoDeMascotaDto;
        private String nombreTipoMascotaDto;
    }



}
