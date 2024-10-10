package com.servipet.backend.Pedido.Servicio;

import com.servipet.backend.Pedido.Modelo.Pedido;
import com.servipet.backend.Pedido.Repositorio.RepositorioPedido;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServicioPedido {
    private final RepositorioPedido repositorioPedido;
    public ServicioPedido(RepositorioPedido repositorioPedido) {
        this.repositorioPedido = repositorioPedido;
    }
    @Transactional
    public void RegistrarPedido(Pedido pedido) {
        repositorioPedido.save(pedido);
    }
    public List<Pedido> ListarPedidos() {
        return repositorioPedido.findAll();
    }
    public Optional<Pedido> BuscarPedido(int id) {
       return  repositorioPedido.findById(id);
    }

}
