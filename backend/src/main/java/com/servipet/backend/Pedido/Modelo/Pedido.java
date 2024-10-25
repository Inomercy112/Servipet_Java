package com.servipet.backend.Pedido.Modelo;

import com.servipet.backend.Usuario.clase.Usuario;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Table(name = "pedido")
@Entity
public class Pedido {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name = "id_pedido")
    private int id;
    @Column(name = "valor_compra")
    private double valorCompra;

    @ManyToOne(fetch = FetchType.LAZY , optional = false)
    @JoinColumn(name = "quien_compra")
    private Usuario quienCompra;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "metodo_entrega")
    private MetodoEntrega metodoEntrega;

    @ManyToOne(fetch = FetchType.LAZY,optional = false)
    @JoinColumn(name = "estado_entrega")
    private EstadoEntrega estadoEntrega;

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL)
    private List<ProductoPedido> detallesPedido = new ArrayList<>();

}
