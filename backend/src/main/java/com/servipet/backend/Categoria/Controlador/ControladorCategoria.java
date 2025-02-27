package com.servipet.backend.Categoria.Controlador;

import com.servipet.backend.Categoria.DTO.CategoriaDTO;
import com.servipet.backend.Categoria.Servicio.ServicioCategoria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/categoria")
public class ControladorCategoria {
    private final ServicioCategoria servicioCategoria;
    @Autowired
    public ControladorCategoria(ServicioCategoria servicioCategoria) {
        this.servicioCategoria = servicioCategoria;
    }
    @PostMapping("/Registrar")
    public ResponseEntity<String> RegistrarCategoria(@RequestBody CategoriaDTO categoriaDTO) {
        try {
            servicioCategoria.registrarCategoria(categoriaDTO);
            return  ResponseEntity.ok("Categoria registrada con exito");
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/Consultar")
    public ResponseEntity< List<CategoriaDTO>> ConsultarCategoria() {
        try {
            List<CategoriaDTO> categoriaList = servicioCategoria.listarCategoria();
            return ResponseEntity.ok().body(categoriaList);

        }catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @PutMapping("/Actualizar/{id}")
    public ResponseEntity<String> ActualizarCategoria(@RequestBody CategoriaDTO categoriaDTO, @PathVariable String id) {
        try {
            categoriaDTO.setIdDto(id);
             servicioCategoria.actualizarCategoria(categoriaDTO);
             return  ResponseEntity.ok("Categoria actualizada con exito");
        }catch (Exception e) {
            return ResponseEntity.badRequest().body("no se pudo actualizar la categoria " + e.getMessage());
        }
    }
    @DeleteMapping("Eliminar/{id}")
    public ResponseEntity<String> EliminarCategoria(@PathVariable String id) {
        try {
            Optional<CategoriaDTO> categoriaDTOOptional = servicioCategoria.buscarCategoriaPorId(id);
            if (categoriaDTOOptional.isPresent()) {
                servicioCategoria.eliminarCategoria(categoriaDTOOptional.get());
                return ResponseEntity.ok("Categoria eliminada con exito");
            }else {
                return ResponseEntity.badRequest().body("no se pudo eliminar la categoria " + id);
            }


        }catch (Exception e) {
            return ResponseEntity.badRequest().body("ocurrio un error " + e.getMessage());
        }
    }

}
