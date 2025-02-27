package com.servipet.backend.Categoria.Servicio;

import com.servipet.backend.Categoria.DTO.CategoriaDTO;
import com.servipet.backend.Categoria.Modelo.Categoria;
import com.servipet.backend.Categoria.Repositorio.RepositorioCategoria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class ServicioCategoria {
    private final RepositorioCategoria repositorioCategoria;
    @Autowired
    public ServicioCategoria(RepositorioCategoria repositorioCategoria) {
        this.repositorioCategoria = repositorioCategoria;
    }
    public void registrarCategoria(CategoriaDTO categoriaDTO) {
        Categoria categoria = new Categoria();
        convertirCategoriaEntity(categoriaDTO, categoria);
        repositorioCategoria.save(categoria);
    }
    public Optional<CategoriaDTO> buscarCategoriaPorId(String id) {
        return repositorioCategoria.findById(id).map(this ::convertirCategoriaDTO);
    }
    public List<CategoriaDTO> listarCategoria() {
        return repositorioCategoria.findAll().stream().map(this::convertirCategoriaDTO).toList();
    }
    public void actualizarCategoria(CategoriaDTO categoriaDTO) {
        Optional<Categoria> categoriaOptional = repositorioCategoria.findById(categoriaDTO.getIdDto());
        Categoria categoria;
        if (categoriaOptional.isPresent()) {
            categoria = categoriaOptional.get();
            convertirCategoriaEntity(categoriaDTO, categoria);
            repositorioCategoria.save(categoria);
        }
    }
    public void eliminarCategoria(CategoriaDTO categoriaDTO) {
        Optional<Categoria> categoriaOptional = repositorioCategoria.findById(categoriaDTO.getIdDto());
        if (categoriaOptional.isPresent()) {
            repositorioCategoria.deleteById(categoriaDTO.getIdDto());
        }else {
            throw new RuntimeException("Categoria no encontrada");
        }
    }

    private CategoriaDTO convertirCategoriaDTO(Categoria categoria) {
        CategoriaDTO categoriaDTO = new CategoriaDTO();
        categoriaDTO.setIdDto(categoria.getId());
        categoriaDTO.setNombreCategoriaDto(categoria.getNombreCategoria());
        return categoriaDTO;
    }
    private void convertirCategoriaEntity(CategoriaDTO categoriaDTO, Categoria categoria) {
        categoria.setId(categoriaDTO.getIdDto());
        categoria.setNombreCategoria(categoriaDTO.getNombreCategoriaDto());
    }
}
