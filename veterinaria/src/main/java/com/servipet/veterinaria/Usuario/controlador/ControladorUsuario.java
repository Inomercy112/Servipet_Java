package com.servipet.veterinaria.Usuario.controlador;
import com.servipet.veterinaria.Usuario.ClaseUsuario;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import com.servipet.veterinaria.Usuario.servicio.ServicioUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Controller
@RequestMapping("/usuario")
public class ControladorUsuario {


    @Autowired
    private ServicioUsuario servicioUsuario;
    @PostMapping("/RegistroUsuario")
    public String  registrarUsuario(@ModelAttribute("usuario") ClaseUsuario claseUsuario, Model model){
        servicioUsuario.guardarUsuario(claseUsuario);
        return "redirect:/usuarios/formulario/usuario?success";
    }
    @GetMapping("/formulario")
    public String formularioUsuario(Model model){
        model.addAttribute("usuario", new ClaseUsuario());
        return "Usuarios/RegistroUsuario";
    }
    @GetMapping
    public List<ClaseUsuario> consultarUsuario(){
        return servicioUsuario.consultarUsuario();
    }
}
