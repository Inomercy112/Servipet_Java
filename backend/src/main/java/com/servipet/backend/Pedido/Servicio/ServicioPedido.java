package com.servipet.backend.Pedido.Servicio;


import com.servipet.backend.Pedido.DTO.PedidoDto;

import com.servipet.backend.Pedido.Modelo.EstadoEntrega;
import com.servipet.backend.Pedido.Modelo.MetodoEntrega;
import com.servipet.backend.Pedido.Modelo.Pedido;
import com.servipet.backend.Pedido.Modelo.ProductoPedido;
import com.servipet.backend.Pedido.Repositorio.RepositorioEstadoEntrega;
import com.servipet.backend.Pedido.Repositorio.RepositorioMetodoEntrega;
import com.servipet.backend.Pedido.Repositorio.RepositorioPedido;

import com.servipet.backend.Pedido.Repositorio.RepositorioProductoPedido;
import com.servipet.backend.Producto.Modelo.ProductoMongo;
import com.servipet.backend.Producto.Repositorio.RepositorioProducto;
import com.servipet.backend.Usuario.Modelo.Usuario;
import com.servipet.backend.Usuario.Repositorio.RepositorioUsuario;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class ServicioPedido {
    private final RepositorioPedido repositorioPedido;

    private final RepositorioMetodoEntrega repositorioMetodoEntrega;
    private final RepositorioEstadoEntrega repositorioEstadoEntrega;
    private final RepositorioProductoPedido repositorioProductoPedido;
    private final RepositorioProducto repositorioProducto;
    private final RepositorioUsuario repositorioUsuario;

    public ServicioPedido(RepositorioProducto repositorioProducto, RepositorioPedido repositorioPedido, RepositorioMetodoEntrega repositorioMetodoEntrega, RepositorioEstadoEntrega repositorioEstadoEntrega, RepositorioProductoPedido repositorioProductoPedido, RepositorioUsuario repositorioUsuario) {
        this.repositorioPedido = repositorioPedido;
        this.repositorioMetodoEntrega = repositorioMetodoEntrega;
        this.repositorioEstadoEntrega = repositorioEstadoEntrega;
        this.repositorioProductoPedido = repositorioProductoPedido;
        this.repositorioProducto = repositorioProducto;
        this.repositorioUsuario = repositorioUsuario;
    }
    @Transactional
    public void registrarPedido(PedidoDto pedidoDto) {
        EstadoEntrega estadoEntrega = repositorioEstadoEntrega.findById(pedidoDto.getEstadoEntregaDto().getIdDto()).orElseThrow();
        MetodoEntrega metodoEntrega = repositorioMetodoEntrega.findById(pedidoDto.getMetodoEntregaDto().getIdDto()).orElseThrow();
        Pedido pedido = new Pedido();

        convertirPedidoEntity(pedidoDto, pedido, estadoEntrega, metodoEntrega);
        repositorioPedido.save(pedido);

    }
    public List<PedidoDto> obtenerPedidosIdUsuario(String idUsuario) {
        return repositorioPedido.findByQuienCompraOrderByDiaCompraDescHoraCompraDesc(idUsuario).stream().map(this::convertirPedidoDto).toList();

    }
    @Transactional
    public List<PedidoDto> obtenerPedidoIdVeterinario(String idVeterinario) {
        return repositorioPedido.findByVendedor(idVeterinario).stream().map(this::convertirPedidoDto).toList();
    }
    public List<PedidoDto> consultarPedidos() {
        return repositorioPedido.findAll().stream().map(this::convertirPedidoDto).toList();

    }
    private @NotNull List<PedidoDto.DetallesPedidoDto> getDetallesPedidoDtos(Pedido pedido) {
        List<PedidoDto.DetallesPedidoDto> detallesPedidoDtoList = new ArrayList<>();
        for (ProductoPedido productoPedido : pedido.getDetallesPedido()){
            PedidoDto.DetallesPedidoDto detallesPedidoDto = new PedidoDto.DetallesPedidoDto();
            detallesPedidoDto.setIdDto(productoPedido.getIdProducto());
            detallesPedidoDto.setQuienVendeDto(productoPedido.getQuienVende());
            detallesPedidoDto.setPrecioActualDto(productoPedido.getPrecioActual());
            Optional <Usuario> usuario = repositorioUsuario.findById(productoPedido.getQuienVende());
            usuario.ifPresent(value -> detallesPedidoDto.setNombreVendedorDto(value.getNombreUsuario()));
            ProductoMongo productoMongo = repositorioProducto.findById(productoPedido.getIdProducto()).orElseThrow();
            detallesPedidoDto.setNombreProductoDto(productoMongo.getNombreProducto());
            detallesPedidoDto.setCantidadProductoDto(productoPedido.getCantidadProducto());
            detallesPedidoDtoList.add(detallesPedidoDto);
        }
        return detallesPedidoDtoList;
    }
    private @NotNull List<ProductoPedido> getDetallesPedidoEntity(PedidoDto pedidoDto, Pedido pedido) {
        List<ProductoPedido> productoPedidoList = new ArrayList<>();
        for (PedidoDto.DetallesPedidoDto detallesPedidoDto : pedidoDto.getProductosDto()){
            ProductoPedido productoPedido = new ProductoPedido();
            productoPedido.setIdProducto(detallesPedidoDto.getIdDto());
            productoPedido.setCantidadProducto(detallesPedidoDto.getCantidadProductoDto());
            productoPedido.setPrecioActual(detallesPedidoDto.getPrecioActualDto());
            productoPedido.setQuienVende(detallesPedidoDto.getQuienVendeDto());
            ProductoMongo productoMongo = repositorioProducto.findById(detallesPedidoDto.getIdDto()).orElseThrow();
            int cantidadActual = productoMongo.getCantidadProducto() - detallesPedidoDto.getCantidadProductoDto();
            productoMongo.setCantidadProducto(cantidadActual);
            repositorioProducto.save(productoMongo);
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
        Optional <Usuario> optionalUsuario = repositorioUsuario.findById(pedido.getQuienCompra());
        optionalUsuario.ifPresent(usuario -> pedidoDto.setNombreUsuarioDto(usuario.getNombreUsuario()));
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
        pedido.setMetodoEntrega(metodoEntrega);
        pedido.setEstadoEntrega(estadoEntrega);
        pedido.getDetallesPedido().clear();
        List<ProductoPedido> detallesPedidoDtoList = getDetallesPedidoEntity(pedidoDto,pedido);
        pedido.getDetallesPedido().addAll(detallesPedidoDtoList);
    }

}
