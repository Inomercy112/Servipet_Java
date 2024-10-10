package com.servipet.backend.Pedido.Modelo;

import com.servipet.backend.Usuario.clase.Usuario;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "pedido")
public class Pedido {
    @Id
    @Column(name = "id_compra", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "valor_compra", nullable = false)
    private Integer valorCompra;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "metodo_entrega", nullable = false)
    private MetodoEntrega metodoEntrega;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "estado_entrega", nullable = false)
    private EstadoEntrega estadoEntrega;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "quien_compra", nullable = false)
    private Usuario quienCompra;

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<ProductoPedido> productos = new HashSet<>();
}