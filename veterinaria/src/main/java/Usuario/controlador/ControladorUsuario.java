package Usuario.controlador;

import Usuario.ClaseUsuario;
import Usuario.servicio.ServicioUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class ControladorUsuario {
    @Autowired
    private ServicioUsuario servicioUsuario;
    @PostMapping
    public ClaseUsuario registrarUsuario(@RequestBody ClaseUsuario claseUsuario){
        return servicioUsuario.guardarUsuario(claseUsuario);
    }
    @GetMapping
    public List<ClaseUsuario> consultarUsuario(){
        return servicioUsuario.consultarUsuario();
    }
}
