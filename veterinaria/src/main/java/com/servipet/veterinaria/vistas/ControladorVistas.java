package com.servipet.veterinaria.vistas;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/Servipet")
@Controller
public class ControladorVistas {
    @GetMapping("/home")
    public String home(Model model) {
        model.addAttribute("title", "Página de Inicio");
        model.addAttribute("content", "Usuarios/index");

        return "fragmentos/app2";
    }
    @GetMapping("login")
    public String login(Model model){
        model.addAttribute("title", "Inicio de sesion");
        model.addAttribute("content", "Usuarios/login");


        return "fragmentos/app3";

    }


}
