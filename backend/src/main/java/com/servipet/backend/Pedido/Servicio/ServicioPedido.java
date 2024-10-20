package com.servipet.backend.Pedido.Servicio;

import com.servipet.backend.Exepciones.ResourceNotFoundException;
import com.servipet.backend.Pedido.Modelo.Pedido;

import com.servipet.backend.Pedido.Modelo.ProductoPedido;
import com.servipet.backend.Pedido.Repositorio.RepositorioPedido;


import com.servipet.backend.Pedido.Repositorio.RepositorioProductoPedido;
import com.servipet.backend.Producto.Modelo.Producto;
import com.servipet.backend.Producto.Repositorio.RepositorioProducto;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class ServicioPedido {
    private final RepositorioPedido repositorioPedido;
    private final RepositorioProducto repositorioProducto;
    private final RepositorioProductoPedido repositorioProductoPedido;
    public ServicioPedido(RepositorioPedido repositorioPedido, RepositorioProducto repositorioProducto, RepositorioProductoPedido repositorioProductoPedido) {
        this.repositorioPedido = repositorioPedido;
        this.repositorioProducto = repositorioProducto;
        this.repositorioProductoPedido = repositorioProductoPedido;

    }
    @Transactional
    public Pedido registrarPedido(Pedido pedido) throws ResourceNotFoundException {

        Pedido nuevoPedido = repositorioPedido.save(pedido);


        for (ProductoPedido ventaProducto : pedido.getProductos()) {
            Producto producto = repositorioProducto.findById(ventaProducto.getProducto().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));


            ventaProducto.setPedido(nuevoPedido);
            ventaProducto.setProducto(producto);


            repositorioProductoPedido.save(ventaProducto);
        }

        return nuevoPedido;


    }

    public List<Pedido> ListarPedidos() {
        return repositorioPedido.findAll();
    }
    public Optional<Pedido> BuscarPedido(int id) {
       return  repositorioPedido.findById(id);
    }

}
