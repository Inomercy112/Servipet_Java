package com.servipet.backend.Usuario.Servicio;
import com.servipet.backend.Usuario.DTO.UsuarioDTO;
import com.servipet.backend.Usuario.Repositorio.RepositorioUsuario;
import com.servipet.backend.Usuario.Modelo.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.sql.Time;
import java.time.LocalTime;
import java.util.ArrayList;
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
    public ResponseEntity<?> guardarUsuario(UsuarioDTO usuarioDTO){
        Optional<Usuario> usuarioCorreo = repositoriousuario.findByCorreoUsuario(usuarioDTO.getCorreoUsuarioDto());
        Optional<Usuario> nombreUsuario = repositoriousuario.findByNombreUsuario(usuarioDTO.getNombreUsuarioDto());
        System.out.println(usuarioCorreo.isPresent());
        System.out.println(nombreUsuario.isPresent());
        if(usuarioCorreo.isPresent()){
            return ResponseEntity.badRequest().body("Usuario ya existe");
        }
        if(nombreUsuario.isPresent()){

            return ResponseEntity.badRequest().body("Nombre Usuario ya existe");
        }
        String contrasenaEncriptada = bCryptPasswordEncoder.encode(usuarioDTO.getContrasenaUsuarioDto());
        usuarioDTO.setContrasenaUsuarioDto(contrasenaEncriptada);
        Usuario usuario  = new Usuario();
        ConvertirUsuarioEntity(usuarioDTO, usuario);
        repositoriousuario.save(usuario);
        return ResponseEntity.ok(usuarioDTO);
    }
    public Usuario registrarUsuarioOAuth(Usuario usuario){
        return repositoriousuario.save(usuario);
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
    public Optional<Usuario> login(String correo) {
        return repositoriousuario.findByCorreoUsuario(correo);
    }

    public Optional<UsuarioDTO> buscarPorCorreo(String correo){
        return repositoriousuario.findByCorreoUsuario(correo).map(this::ConvertirusuarioDTO);

    }
    @Override
    public Optional<UsuarioDTO> buscarPorNombre(String nombre){
        return repositoriousuario.findByNombreUsuario(nombre).stream().map(this::ConvertirusuarioDTO).findFirst();
    }


    private UsuarioDTO ConvertirusuarioDTO(Usuario usuario) {
        UsuarioDTO usuarioDTO = new UsuarioDTO();
        usuarioDTO.setIdDto(usuario.getId());
        usuarioDTO.setDocumentoUsuarioDto(usuario.getDocumentoUsuario());
        usuarioDTO.setNombreUsuarioDto(usuario.getNombreUsuario());
        usuarioDTO.setCorreoUsuarioDto(usuario.getCorreoUsuario());
        usuarioDTO.setFechaNacimientoDto(usuario.getFechaNacimiento());
        usuarioDTO.setTelefonoUsuarioDto(usuario.getTelefonoUsuario());
        usuarioDTO.setDireccionUsuarioDto(usuario.getDireccionUsuario());
        usuarioDTO.setRolUsuarioDto(usuario.getRolUsuario());

        if (usuario.getImagenUsuario() != null) {
            usuarioDTO.setImagenUsuarioDto(usuario.getImagenUsuario());
        }

        if (usuario.getHorarioAtencion() != null && !usuario.getHorarioAtencion().isEmpty()) {
            List<UsuarioDTO.HorarioAtencionDto> horarioAtencionDtos = new ArrayList<>();
            for (Usuario.HorarioAtencion horario : usuario.getHorarioAtencion()) {
                UsuarioDTO.HorarioAtencionDto horarioAtencionDto = new UsuarioDTO.HorarioAtencionDto();
                horarioAtencionDto.setDiaDto(horario.getDia());
                horarioAtencionDto.setAperturaDto(horario.getApertura());
                horarioAtencionDto.setCierreDto(horario.getCierre());
                horarioAtencionDto.setCerrado(horario.isCerrado()); // ✅ Agregado aquí

                horarioAtencionDtos.add(horarioAtencionDto);
            }
            usuarioDTO.setHorarioAtencionDto(horarioAtencionDtos);
        }
        return usuarioDTO;
    }

    private void ConvertirUsuarioEntity(UsuarioDTO usuarioDTO, Usuario usuario) {
        usuario.setDocumentoUsuario(usuarioDTO.getDocumentoUsuarioDto());
        usuario.setNombreUsuario(usuarioDTO.getNombreUsuarioDto());
        usuario.setCorreoUsuario(usuarioDTO.getCorreoUsuarioDto());
        usuario.setContrasenaUsuario(usuarioDTO.getContrasenaUsuarioDto());
        usuario.setFechaNacimiento(usuarioDTO.getFechaNacimientoDto());
        usuario.setTelefonoUsuario(usuarioDTO.getTelefonoUsuarioDto());
        usuario.setDireccionUsuario(usuarioDTO.getDireccionUsuarioDto());
        usuario.setRolUsuario(usuarioDTO.getRolUsuarioDto());
        usuario.setEstadoUsuario(usuarioDTO.getEstadoUsuarioDto());

        if (usuarioDTO.getImagenUsuarioDto() != null) {
            try {
                usuario.setImagenUsuario(Base64.getDecoder().decode(usuarioDTO.getImagenUsuarioDto()));
            } catch (IllegalArgumentException e) {
                throw new RuntimeException("Error al decodificar la imagen en Base64", e);
            }
        }

        usuario.setCorreoContacto(usuarioDTO.getCorreoContactoDto());
        usuario.setNombreResponsable(usuarioDTO.getNombreResponsableDto());

        if (usuarioDTO.getHorarioAtencionDto() != null && !usuarioDTO.getHorarioAtencionDto().isEmpty()) {
            List<Usuario.HorarioAtencion> horarios = new ArrayList<>();
            for (UsuarioDTO.HorarioAtencionDto dto : usuarioDTO.getHorarioAtencionDto()) {
                Usuario.HorarioAtencion horario = new Usuario.HorarioAtencion();
                horario.setDia(dto.getDiaDto());

                if (!dto.isCerrado()) {
                    horario.setApertura(dto.getAperturaDto());
                    horario.setCierre(dto.getCierreDto());

                }
                horario.setCerrado(dto.isCerrado());
                horarios.add(horario);
            }
            usuario.setHorarioAtencion(horarios);
        }
    }

}


