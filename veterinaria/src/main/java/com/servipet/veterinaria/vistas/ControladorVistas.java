package com.servipet.veterinaria.vistas;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


public class ControladorVistas {
    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("title", "Página de Inicio");
        model.addAttribute("content", "home");
        return "layouts/app";
    }
}
