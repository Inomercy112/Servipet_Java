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

    @GetMapping("/index")
    public String index(Model model){
        model.addAttribute("message", "¡Hola, Thymeleaf!");
        return "Usuarios/index";
    }


    @Autowired
    private ServicioUsuario servicioUsuario;
    @PostMapping("/RegistroUsuario")
    public String  registrarUsuario(@ModelAttribute("usuario") ClaseUsuario claseUsuario){
        servicioUsuario.guardarUsuario(claseUsuario);
        return "redirect:/usuario/consultar";
    }
    @GetMapping("/formulario")
    public String formularioUsuario(Model model){
        model.addAttribute("usuario", new ClaseUsuario());
        return "Usuarios/RegistroUsuario";
    }
    @GetMapping("/consultar")
    public String consultarUsuario(Model model){
        model.addAttribute("usuarios",servicioUsuario.consultarUsuario());
        model.addAttribute("content", "Usuarios/consultarUsuario");
        model.addAttribute("title","consultar usuario");

        return "fragmentos/app";
    }
}
