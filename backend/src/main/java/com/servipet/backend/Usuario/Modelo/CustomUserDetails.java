package com.servipet.backend.Usuario.Modelo;

import com.servipet.backend.Usuario.DTO.UsuarioDTO;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;

import java.util.List;

public class CustomUserDetails implements UserDetails {


    private final UsuarioDTO usuarioDTO;

    public CustomUserDetails(UsuarioDTO usuarioDTO) {
        this.usuarioDTO = usuarioDTO;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(usuarioDTO.getRolUsuarioDto()));
    }

    @Override
    public String getPassword() {
        return usuarioDTO.getContrasenaUsuarioDto();
    }

    @Override
    public String getUsername() {
        return usuarioDTO.getNombreUsuarioDto();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return usuarioDTO.getEstadoUsuarioDto() == 1;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return usuarioDTO.getEstadoUsuarioDto()== 1;
    }
}
