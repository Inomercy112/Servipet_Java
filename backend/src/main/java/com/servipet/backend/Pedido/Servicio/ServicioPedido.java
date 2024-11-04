package com.servipet.backend.Pedido.Servicio;

import com.servipet.backend.Pedido.DTO.DetallesPedidoDto;
import com.servipet.backend.Pedido.DTO.PedidoDto;
import com.servipet.backend.Pedido.Modelo.EstadoEntrega;
import com.servipet.backend.Pedido.Modelo.MetodoEntrega;
import com.servipet.backend.Pedido.Modelo.Pedido;
import com.servipet.backend.Pedido.Modelo.ProductoPedido;
import com.servipet.backend.Pedido.Repositorio.RepositorioEstadoEntrega;
import com.servipet.backend.Pedido.Repositorio.RepositorioMetodoEntrega;
import com.servipet.backend.Pedido.Repositorio.RepositorioPedido;
import com.servipet.backend.Producto.Modelo.Producto;
import com.servipet.backend.Producto.Repositorio.RepositorioProducto;
import com.servipet.backend.Usuario.Repositorio.RepositorioUsuario;
import com.servipet.backend.Usuario.clase.Usuario;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ServicioPedido {
    private final RepositorioPedido repositorioPedido;
    private final RepositorioUsuario repositorioUsuario;
    private final RepositorioMetodoEntrega repositorioMetodoEntrega;
    private final RepositorioEstadoEntrega repositorioEstadoEntrega;
    private final RepositorioProducto repositorioProducto;

    public ServicioPedido(RepositorioPedido repositorioPedido, RepositorioUsuario repositorioUsuario, RepositorioMetodoEntrega repositorioMetodoEntrega, RepositorioEstadoEntrega repositorioEstadoEntrega, RepositorioProducto repositorioProducto) {
        this.repositorioPedido = repositorioPedido;
        this.repositorioUsuario = repositorioUsuario;
        this.repositorioMetodoEntrega = repositorioMetodoEntrega;
        this.repositorioEstadoEntrega = repositorioEstadoEntrega;
        this.repositorioProducto = repositorioProducto;
    }

    public Pedido RegistrarPedido(PedidoDto pedidoDto) {
        Pedido pedido = new Pedido();
        Usuario usuario = repositorioUsuario.findById(pedidoDto.getQuienCompra()).orElseThrow(()-> new RuntimeException("Usuario no encontrado"));
                pedido.setQuienCompra(usuario);
        MetodoEntrega metodoEntrega = repositorioMetodoEntrega.findById(pedidoDto.getMetodoEntrega()).orElseThrow(()-> new RuntimeException("metodo no encontrado"));
                pedido.setMetodoEntrega(metodoEntrega);
        EstadoEntrega estadoEntrega = repositorioEstadoEntrega.findById(pedidoDto.getEstadoEntrega()).orElseThrow(()-> new RuntimeException("estado no encontrado"));
        pedido.setEstadoEntrega(estadoEntrega);

        pedido.setDiaCompra(pedidoDto.getDiaCompra());
        pedido.setHoraCompra(pedidoDto.getHoraCompra());
        pedido.setDireccion(pedidoDto.getDireccion());



        List<ProductoPedido> detalles = new ArrayList<>();
        for(DetallesPedidoDto detallesPedidoDto : pedidoDto.getProductos()){
            if (detallesPedidoDto.getProductoId() == null) {
                throw new IllegalArgumentException("El ID del producto no puede ser nulo");
            }
            Producto producto = repositorioProducto.findById(detallesPedidoDto.getProductoId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
            ProductoPedido productoPedido = new ProductoPedido();
            productoPedido.setIdProducto(producto);
            productoPedido.setPedido(pedido);
            productoPedido.setCantidadProducto(detallesPedidoDto.getCantidad());
            productoPedido.setPrecioActual(detallesPedidoDto.getPrecioActual());
            detalles.add(productoPedido);
        }
        pedido.setDetallesPedido(detalles);
        return repositorioPedido.save(pedido);

    }
}
