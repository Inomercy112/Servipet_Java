package com.servipet.backend.Producto.Servicio;

import com.servipet.backend.Producto.Modelo.Producto;
import com.servipet.backend.Producto.Repositorio.RepositorioProducto;
import com.servipet.backend.Usuario.clase.Estado;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServicioProducto {
    private final RepositorioProducto repositorioProducto;
    @Autowired
    public ServicioProducto(RepositorioProducto repositorioProducto) {
        this.repositorioProducto = repositorioProducto;
    }

    public Producto RegistrarProducto(Producto producto) {
        return repositorioProducto.save(producto);
    }
    public Producto ModificarProducto(Producto producto) {
        return repositorioProducto.save(producto);
    }
    public List<Producto> ListarProductos() {
        return repositorioProducto.findAll();
    }
    public Optional<Producto> BuscarProducto(int id) {
        return repositorioProducto.findById(id);
    }
    public Producto desactivarProducto(Producto producto) {
        Estado estado = producto.getEstado();
        producto.setEstado(estado);
        return repositorioProducto.save(producto);

    }


}
