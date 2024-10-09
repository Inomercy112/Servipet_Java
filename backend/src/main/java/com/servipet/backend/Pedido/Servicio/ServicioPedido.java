package com.servipet.backend.Pedido.Servicio;

import com.servipet.backend.Pedido.Repositorio.RepositorioPedido;
import org.springframework.stereotype.Service;

@Service
public class ServicioPedido {
    private final RepositorioPedido repositorioPedido;
    public ServicioPedido(RepositorioPedido repositorioPedido) {
        this.repositorioPedido = repositorioPedido;
    }

}
