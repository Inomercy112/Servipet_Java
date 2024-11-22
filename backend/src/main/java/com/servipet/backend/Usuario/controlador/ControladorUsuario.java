package com.servipet.backend.Usuario.controlador;
import com.servipet.backend.Usuario.DTO.UsuarioDTO;
import com.servipet.backend.Usuario.Repositorio.RepositorioEstado;
import com.servipet.backend.Usuario.clase.Estado;
import com.servipet.backend.Usuario.clase.Usuario;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.servipet.backend.Usuario.servicio.ServicioUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/usuario")
public class ControladorUsuario {
    private final ServicioUsuario servicioUsuario;
    private final RepositorioEstado repositorioEstado;

    @Autowired
    public ControladorUsuario(ServicioUsuario servicioUsuario, RepositorioEstado repositorioEstado) {
        this.servicioUsuario = servicioUsuario;
        this.repositorioEstado = repositorioEstado;

    }


    @PostMapping("/Registrar")
    public ResponseEntity<String>  registrarUsuario(@RequestBody UsuarioDTO usuarioDTO){
        try {
                Usuario usuario = new Usuario();
                GuardarUsuarioDTO(usuarioDTO, usuario);
                servicioUsuario.guardarUsuario(usuario);
                return ResponseEntity.ok("Usuario Registrado");
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage()+ "error de servidor");
        }
    }
    @GetMapping("/Consultar")
    public ResponseEntity< List<UsuarioDTO>> consultarUsuario() {
        try {
            List<UsuarioDTO> usuarioDTOList = servicioUsuario.consultarUsuario()
                    .stream().map(this::convertirAusuarioDTO).toList();
            return ResponseEntity.ok(usuarioDTOList);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }
    @GetMapping("/Consultar/{nombre}")
    public ResponseEntity< Optional<UsuarioDTO>> DatosUsuario(@PathVariable String nombre){
        try {
            Optional<UsuarioDTO> usuarioDTOOptional = servicioUsuario.buscarPorNombre(nombre).map(this::convertirAusuarioDTO);
            return ResponseEntity.ok(usuarioDTOOptional);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(null);
        }
    }
    @PutMapping("Actualizar/{id}")
    public ResponseEntity<String> actualizarUsuario(@PathVariable Integer id, @RequestBody UsuarioDTO usuarioDTO){
        try {
            Usuario usuario = new Usuario();
            usuario.setId(id);
            GuardarUsuarioDTO(usuarioDTO, usuario);
            servicioUsuario.guardarUsuario(usuario);
            return ResponseEntity.ok("usuario Actualizado");
        }catch (Exception e){
            return ResponseEntity.badRequest().body("Error al actualizar usuario");
        }

    }
    @PutMapping("Desactivar/{id}")
    public ResponseEntity<String> desactivarUsuario(@PathVariable Integer id){
        try {
            Optional<Usuario> usuarioOptional = servicioUsuario.consultarUsuarioPorId(id);
            if(usuarioOptional.isPresent()){
                Usuario usuario = usuarioOptional.get();
                servicioUsuario.desactivarUsuario(usuario);
                return ResponseEntity.ok("Usuario desactivado");

            }else {
                return ResponseEntity.ok("Usuario no encontrado");
            }

        }catch (Exception e){
            return ResponseEntity.badRequest().body("Error al desactivar usuario");
        }


    }
    private UsuarioDTO convertirAusuarioDTO(Usuario usuario){
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
    private void GuardarUsuarioDTO(@RequestBody UsuarioDTO usuarioDTO, Usuario usuario){
        usuario.setDocumentoUsuario(usuarioDTO.getDocumentoUsuarioDto());
        usuario.setNombreUsuario(usuarioDTO.getNombreUsuarioDto());
        usuario.setCorreoUsuario(usuarioDTO.getCorreoUsuarioDto());
        usuario.setContrasenaUsuario(usuarioDTO.getContrasenaUsuarioDto());
        usuario.setFechaNacimiento(usuarioDTO.getFechaNacimientoDto());
        usuario.setTelefonoUsuario(usuarioDTO.getTelefonoUsuarioDto());
        usuario.setDireccionUsuario(usuarioDTO.getDireccionUsuarioDto());
        usuario.setRolUsuario(usuarioDTO.getRolUsuarioDto());
        Estado estado = repositorioEstado.findById(1);
        usuario.setEstadoUsuario(estado);

    }





}
