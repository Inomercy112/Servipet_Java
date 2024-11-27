package com.servipet.backend.Usuario.Servicio;

import com.servipet.backend.Usuario.DTO.UsuarioDTO;

import java.util.Optional;

public interface ServicioUsuarioMinimal {

    Optional<UsuarioDTO> buscarPorNombre(String nombre);
}
