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
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ServicioPedido {
    private final RepositorioPedido repositorioPedido;

    private final RepositorioMetodoEntrega repositorioMetodoEntrega;
    private final RepositorioEstadoEntrega repositorioEstadoEntrega;
    private final RepositorioProducto repositorioProducto;

    public ServicioPedido(RepositorioPedido repositorioPedido, RepositorioMetodoEntrega repositorioMetodoEntrega, RepositorioEstadoEntrega repositorioEstadoEntrega, RepositorioProducto repositorioProducto) {
        this.repositorioPedido = repositorioPedido;
        this.repositorioMetodoEntrega = repositorioMetodoEntrega;
        this.repositorioEstadoEntrega = repositorioEstadoEntrega;
        this.repositorioProducto = repositorioProducto;
    }

    public void RegistrarPedido(PedidoDto pedidoDto) {
        Pedido pedido = new Pedido();

        MetodoEntrega metodoEntrega = repositorioMetodoEntrega.findById(pedidoDto.getMetodoEntrega())
                .orElseThrow(()-> new RuntimeException("metodo no encontrado"));
                pedido.setMetodoEntrega(metodoEntrega);
        EstadoEntrega estadoEntrega = repositorioEstadoEntrega.findById(pedidoDto.getEstadoEntrega())
                .orElseThrow(()-> new RuntimeException("estado no encontrado"));
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
        repositorioPedido.save(pedido);

    }
}
