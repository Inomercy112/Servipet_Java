package com.servipet.backend.DatosDomicilio.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DatosDomicilioDTO {

    private String idDto;
    private String duenoDomicilioDto;
    private String nombreDto;
    private String localidadDto;
    private String barrioDto;
    private String direccionDto;
    private String telefonoDto;
    private String pisoDepartamentoDto;
    private String casaOTrabajoDto;
    private String adicionalesDto;
}
