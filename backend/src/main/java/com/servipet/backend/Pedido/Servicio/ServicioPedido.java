package com.servipet.backend.Pedido.Servicio;


import com.servipet.backend.Pedido.DTO.PedidoDto;

import com.servipet.backend.Pedido.Modelo.EstadoEntrega;
import com.servipet.backend.Pedido.Modelo.MetodoEntrega;
import com.servipet.backend.Pedido.Modelo.Pedido;
import com.servipet.backend.Pedido.Modelo.ProductoPedido;
import com.servipet.backend.Pedido.Repositorio.RepositorioEstadoEntrega;
import com.servipet.backend.Pedido.Repositorio.RepositorioMetodoEntrega;
import com.servipet.backend.Pedido.Repositorio.RepositorioPedido;

import com.servipet.backend.Producto.Repositorio.RepositorioProducto;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    @Transactional
    public void registrarPedido(PedidoDto pedidoDto) {
        EstadoEntrega estadoEntrega = repositorioEstadoEntrega.findById(pedidoDto.getEstadoEntregaDto().getIdDto()).orElseThrow();
        MetodoEntrega metodoEntrega = repositorioMetodoEntrega.findById(pedidoDto.getMetodoEntregaDto().getIdDto()).orElseThrow();
        Pedido pedido = new Pedido();
        convertirPedidoEntity(pedidoDto,pedido,estadoEntrega,metodoEntrega);
        repositorioPedido.save(pedido);

    }
    private static @NotNull List<PedidoDto.DetallesPedidoDto> getDetallesPedidoDtos(Pedido pedido) {
        List<PedidoDto.DetallesPedidoDto> detallesPedidoDtoList = new ArrayList<>();
        for (ProductoPedido productoPedido : pedido.getDetallesPedido()){
            PedidoDto.DetallesPedidoDto detallesPedidoDto = new PedidoDto.DetallesPedidoDto();
            detallesPedidoDto.setIdDto(productoPedido.getIdProducto());
            detallesPedidoDto.setPrecioActualDto(productoPedido.getPrecioActual());
            detallesPedidoDto.setCantidadProductoDto(productoPedido.getCantidadProducto());
            detallesPedidoDtoList.add(detallesPedidoDto);
        }
        return detallesPedidoDtoList;
    }
    private static @NotNull List<ProductoPedido> getDetallesPedidoEntity(PedidoDto pedidoDto, Pedido pedido) {
        List<ProductoPedido> productoPedidoList = new ArrayList<>();
        for (PedidoDto.DetallesPedidoDto detallesPedidoDto : pedidoDto.getProductosDto()){
            ProductoPedido productoPedido = new ProductoPedido();
            productoPedido.setIdProducto(detallesPedidoDto.getIdDto());
            productoPedido.setCantidadProducto(detallesPedidoDto.getCantidadProductoDto());
            productoPedido.setPrecioActual(detallesPedidoDto.getPrecioActualDto());
            productoPedido.setPedido(pedido);
            productoPedidoList.add(productoPedido);
        }
        return productoPedidoList;
    }

    private PedidoDto convertirPedidoDto(Pedido pedido) {
        PedidoDto pedidoDto = new PedidoDto();
        pedidoDto.setDireccionDto(pedido.getDireccion());
        pedidoDto.setHoraCompraDto(pedido.getHoraCompra());
        pedidoDto.setDiaCompraDto(pedido.getDiaCompra());
        pedidoDto.setQuienCompraDto(pedido.getQuienCompra());
        pedidoDto.setQuienVendeDto(pedido.getQuienVende());
        PedidoDto.EstadoEntregaDto estadoEntregaDto = new PedidoDto.EstadoEntregaDto();
        estadoEntregaDto.setIdDto(pedido.getEstadoEntrega().getId());
        estadoEntregaDto.setNombreEstadoDto(pedido.getEstadoEntrega().getNombreEstado());
        pedidoDto.setEstadoEntregaDto(estadoEntregaDto);
        PedidoDto.MetodoentregaDto metodoentregaDto = new PedidoDto.MetodoentregaDto();
        metodoentregaDto.setIdDto(pedido.getMetodoEntrega().getId());
        metodoentregaDto.setNombreMetodoDto(pedido.getMetodoEntrega().getNombreMetodo());
        pedidoDto.setMetodoEntregaDto(metodoentregaDto);
        List<PedidoDto.DetallesPedidoDto> detallesPedidoDtoList = getDetallesPedidoDtos(pedido);
        pedidoDto.setProductosDto(detallesPedidoDtoList);
        return pedidoDto;

    }

    private void convertirPedidoEntity(PedidoDto pedidoDto, Pedido pedido, EstadoEntrega estadoEntrega, MetodoEntrega metodoEntrega) {
        pedido.setDireccion(pedidoDto.getDireccionDto());
        pedido.setHoraCompra(pedidoDto.getHoraCompraDto());
        pedido.setDiaCompra(pedidoDto.getDiaCompraDto());
        pedido.setQuienCompra(pedidoDto.getQuienCompraDto());
        pedido.setQuienVende(pedidoDto.getQuienVendeDto());
        pedido.setMetodoEntrega(metodoEntrega);
        pedido.setEstadoEntrega(estadoEntrega);
        pedido.getDetallesPedido().clear();
        List<ProductoPedido> detallesPedidoDtoList = getDetallesPedidoEntity(pedidoDto,pedido);
        pedido.getDetallesPedido().addAll(detallesPedidoDtoList);
    }

}
