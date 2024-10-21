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
    @Column(name = "cantidad_producto", nullable = false)
    private Integer cantidadProducto;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_producto", nullable = false)
    private Producto idProducto;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_pedido", nullable = false)
    private Pedido pedido;

    @Column(name = "precio_actual", nullable = false)
    private double precioActual;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


}