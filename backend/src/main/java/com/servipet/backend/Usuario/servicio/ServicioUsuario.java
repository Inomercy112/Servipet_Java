package com.servipet.backend.Usuario.Servicio;
import com.servipet.backend.Usuario.DTO.UsuarioDTO;
import com.servipet.backend.Usuario.Repositorio.RepositorioUsuario;
import com.servipet.backend.Usuario.Modelo.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
public class ServicioUsuario implements ServicioUsuarioMinimal {
    private final RepositorioUsuario Repositoriousuario;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public ServicioUsuario(RepositorioUsuario repositorio, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.Repositoriousuario = repositorio;
    }


    public void guardarUsuario(UsuarioDTO usuarioDTO){
        String contrasenaEncriptada = bCryptPasswordEncoder.encode(usuarioDTO.getContrasenaUsuarioDto());
        usuarioDTO.setContrasenaUsuarioDto(contrasenaEncriptada);
        Usuario usuario  = new Usuario();
        ConvertirUsuarioEntity(usuarioDTO, usuario);
        Repositoriousuario.save(usuario);
    }
    public void actualizarUsuario(UsuarioDTO usuarioDTO){
        String contrasenaEncriptada = bCryptPasswordEncoder.encode(usuarioDTO.getContrasenaUsuarioDto());
        usuarioDTO.setContrasenaUsuarioDto(contrasenaEncriptada);
        Optional<Usuario> usuarioOptional = Repositoriousuario.findById(usuarioDTO.getIdDto());
        Usuario usuario;
        if(usuarioOptional.isPresent()){
            usuario = usuarioOptional.get();
            ConvertirUsuarioEntity(usuarioDTO, usuario);
            Repositoriousuario.save(usuario);
        }else {
            throw new RuntimeException("Usuario no encontrado");
        }
    }

    public List<UsuarioDTO> consultarUsuario(){

        return Repositoriousuario.findByEstadoUsuarioAndRolUsuario(1, "administrador")
                .stream()
                .map(this::ConvertirusuarioDTO)
                .toList();
    }

    public Optional<UsuarioDTO> consultarUsuarioPorId(String id){
        return Repositoriousuario.findById(id)
                .map(this::ConvertirusuarioDTO);
    }

    public void desactivarUsuario(UsuarioDTO usuarioDTO){
        Optional<Usuario> usuarioOptional = Repositoriousuario.findById(usuarioDTO.getIdDto());
        if(usuarioOptional.isPresent()){
            Usuario usuario = usuarioOptional.get();
            usuario.setEstadoUsuario(2);
            Repositoriousuario.save(usuario);
        } else {
            throw new RuntimeException("Usuario no encontrado");
        }

    }
    public Optional<Usuario> login(String correo){
        return Optional.ofNullable(
                Repositoriousuario.findByCorreoUsuario(correo)
        );
    }
    @Override
    public Optional<UsuarioDTO> buscarPorNombre(String nombre){
        return Repositoriousuario.findByNombreUsuario(nombre).stream().map(this::ConvertirusuarioDTO).findFirst();
    }


    private UsuarioDTO ConvertirusuarioDTO(Usuario usuario){
        UsuarioDTO usuarioDTO = new UsuarioDTO();
        usuarioDTO.setIdDto(usuario.getId());
        usuarioDTO.setDocumentoUsuarioDto(usuario.getDocumentoUsuario());
        usuarioDTO.setNombreUsuarioDto(usuario.getNombreUsuario());
        usuarioDTO.setCorreoUsuarioDto(usuario.getCorreoUsuario());
        usuarioDTO.setFechaNacimientoDto(usuario.getFechaNacimiento());
        usuarioDTO.setTelefonoUsuarioDto(usuario.getTelefonoUsuario());
        usuarioDTO.setDireccionUsuarioDto(usuario.getDireccionUsuario());
        usuarioDTO.setRolUsuarioDto(usuario.getRolUsuario());
        return usuarioDTO;

    }
    private void ConvertirUsuarioEntity(UsuarioDTO usuarioDTO, Usuario usuario){
        usuario.setDocumentoUsuario(usuarioDTO.getDocumentoUsuarioDto());
        usuario.setNombreUsuario(usuarioDTO.getNombreUsuarioDto());
        usuario.setCorreoUsuario(usuarioDTO.getCorreoUsuarioDto());
        usuario.setContrasenaUsuario(usuarioDTO.getContrasenaUsuarioDto());
        usuario.setFechaNacimiento(usuarioDTO.getFechaNacimientoDto());
        usuario.setTelefonoUsuario(usuarioDTO.getTelefonoUsuarioDto());
        usuario.setDireccionUsuario(usuarioDTO.getDireccionUsuarioDto());
        usuario.setRolUsuario(usuarioDTO.getRolUsuarioDto());
        usuario.setEstadoUsuario(usuarioDTO.getEstadoUsuarioDto());
        usuario.setImagenUsuario(Base64.getEncoder().encode(usuarioDTO.getImagenUsuarioDto()));
        usuario.setCorreoContacto(usuarioDTO.getCorreoContactoDto());
        usuario.setHorarioAtencion(usuarioDTO.getHorarioAtencionDto());
        usuario.setNombreResponsable(usuario.getNombreResponsable());
        usuario.setDiasDisponibles(usuario.getDiasDisponibles());

    }

}


