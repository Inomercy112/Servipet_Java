package com.servipet.backend.Pedido.Modelo;

import com.servipet.backend.Producto.Modelo.Producto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "producto_pedido")
public class ProductoPedido {
    @EmbeddedId
    private ProductoPedidoId idProductoPedidoId;

    @Column(name = "cantidad_producto", nullable = false)
    private Byte cantidadProducto;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @MapsId("productoId")
    @JoinColumn(name = "id_producto", nullable = false)
    private Producto producto;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @MapsId("pedidoId")
    @JoinColumn(name = "id_pedido", nullable = false)
    private Pedido pedido;



}