package com.servipet.backend.Usuario.controlador;
import com.servipet.backend.Usuario.clase.ClaseUsuario;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import com.servipet.backend.Usuario.servicio.ServicioUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;



@Controller
@RequestMapping("/usuario")


public class ControladorUsuario {


    @Autowired
    private ServicioUsuario servicioUsuario;
    @PostMapping("/RegistroUsuario")
    public ResponseEntity<String>  registrarUsuario(@ModelAttribute("usuario") ClaseUsuario claseUsuario){
        servicioUsuario.guardarUsuario(claseUsuario);
        return ResponseEntity.ok("Usuario Registrado");
    }
    @GetMapping("/formulario")
    public String formularioUsuario(Model model){
        model.addAttribute("usuario", new ClaseUsuario());
        return "Usuarios/RegistroUsuario";
    }
    @GetMapping("/consultar")
    public String consultarUsuario(Model model){
        model.addAttribute("formId", "amongo");
        model.addAttribute("usuarios",servicioUsuario.consultarUsuario());
        model.addAttribute("content", "Usuarios/consultarUsuario");
        model.addAttribute("title","consultar usuario");

        return "fragmentos/app2";
    }



}
