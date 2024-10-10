package com.servipet.backend.Pedido.Modelo;

import com.servipet.backend.Producto.Modelo.Producto;
import com.servipet.backend.Usuario.clase.Usuario;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "pedido")
public class Pedido {
    @Id
    @Column(name = "id_compra", nullable = false)
    private Short id;

    @Column(name = "cantidad_producto", nullable = false)
    private Byte cantidadProducto;

    @Column(name = "valor_compra", nullable = false)
    private Integer valorCompra;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "quien_compra", nullable = false)
    private Usuario quienCompra;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "Producto_pedido",
            joinColumns = @JoinColumn(name = "id_producto"),
            inverseJoinColumns = @JoinColumn(name = "id_pedido")
    )
    private List<Producto> productos = new ArrayList<>();

}