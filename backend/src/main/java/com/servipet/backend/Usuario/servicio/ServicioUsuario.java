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
    private final RepositorioUsuario repositoriousuario;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public ServicioUsuario(RepositorioUsuario repositorio, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.repositoriousuario = repositorio;
    }


    public void guardarUsuario(UsuarioDTO usuarioDTO){
        String contrasenaEncriptada = bCryptPasswordEncoder.encode(usuarioDTO.getContrasenaUsuarioDto());
        usuarioDTO.setContrasenaUsuarioDto(contrasenaEncriptada);
        Usuario usuario  = new Usuario();
        ConvertirUsuarioEntity(usuarioDTO, usuario);
        repositoriousuario.save(usuario);
    }
    public void actualizarUsuario(UsuarioDTO usuarioDTO){
        String contrasenaEncriptada = bCryptPasswordEncoder.encode(usuarioDTO.getContrasenaUsuarioDto());
        usuarioDTO.setContrasenaUsuarioDto(contrasenaEncriptada);
        Optional<Usuario> usuarioOptional = repositoriousuario.findById(usuarioDTO.getIdDto());
        Usuario usuario;
        if(usuarioOptional.isPresent()){
            usuario = usuarioOptional.get();
            ConvertirUsuarioEntity(usuarioDTO, usuario);
            repositoriousuario.save(usuario);
        }else {
            throw new RuntimeException("Usuario no encontrado");
        }
    }

    public List<UsuarioDTO> consultarUsuario(){

        return repositoriousuario.findByEstadoUsuarioIsNullAndRolUsuario("administrador")
                .stream()
                .map(this::ConvertirusuarioDTO)
                .toList();
    }

    public Optional<UsuarioDTO> consultarUsuarioPorId(String id){
        return repositoriousuario.findById(id)
                .map(this::ConvertirusuarioDTO);
    }
    public List<UsuarioDTO> consultarVeterinarias(){
        return repositoriousuario.findByRolUsuario("veterinaria").stream().map(this::ConvertirusuarioDTO).toList();
    }

    public void desactivarUsuario(UsuarioDTO usuarioDTO){
        Optional<Usuario> usuarioOptional = repositoriousuario.findById(usuarioDTO.getIdDto());
        if(usuarioOptional.isPresent()){
            Usuario usuario = usuarioOptional.get();
            usuario.setEstadoUsuario(2);
            repositoriousuario.save(usuario);
        } else {
            throw new RuntimeException("Usuario no encontrado");
        }

    }
    public Optional<Usuario> login(String correo){
        return Optional.of(repositoriousuario.findByCorreoUsuario(correo).orElseThrow());
    }
    public Optional<UsuarioDTO> buscarPorCorreo(String correo){
        return repositoriousuario.findByCorreoUsuario(correo).map(this::ConvertirusuarioDTO);

    }
    @Override
    public Optional<UsuarioDTO> buscarPorNombre(String nombre){
        return repositoriousuario.findByNombreUsuario(nombre).stream().map(this::ConvertirusuarioDTO).findFirst();
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
        if(usuario.getImagenUsuario() != null){
            usuarioDTO.setImagenUsuarioDto(usuario.getImagenUsuario());
        }
        usuarioDTO.setCorreoContactoDto(usuario.getCorreoContacto());
        usuarioDTO.setHorarioAtencionDto(usuario.getHorarioAtencion());
        usuarioDTO.setDiasDisponiblesDto(usuario.getDiasDisponibles());
        usuarioDTO.setNombreResponsableDto(usuario.getNombreResponsable());
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
        if(usuarioDTO.getImagenUsuarioDto() != null){
            usuario.setImagenUsuario(Base64.getDecoder().decode(usuarioDTO.getImagenUsuarioDto()));
        }
        usuario.setCorreoContacto(usuarioDTO.getCorreoContactoDto());
        usuario.setHorarioAtencion(usuarioDTO.getHorarioAtencionDto());
        usuario.setNombreResponsable(usuarioDTO.getNombreResponsableDto());
        usuario.setDiasDisponibles(usuarioDTO.getDiasDisponiblesDto());

    }

}


