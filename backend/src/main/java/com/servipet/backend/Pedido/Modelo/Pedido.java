package com.servipet.backend.Pedido.Modelo;

import com.servipet.backend.Usuario.Modelo.Usuario;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;

import java.util.Date;
import java.util.List;
import java.sql.Time;

@Data
@Table(name = "pedido")
@Entity
public class Pedido {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name = "id_pedido")
    private int id;

    @Column(name = "direccion")
    private String direccion;

    @Column(name = "hora_compra")
    private Time horaCompra;
    @Column(name = "dia_compra")
    private Date diaCompra;

    @Column(name = "hora_entrega")
    private Time horaEntrega;
    @Column(name = "dia_entrega")
    private Date diaEntrega;

    @Column(name = "quien_compra")
    private String quienCompra;


    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "metodo_entrega")
    private MetodoEntrega metodoEntrega;

    @ManyToOne(fetch = FetchType.LAZY,optional = false)
    @JoinColumn(name = "estado_entrega")
    private EstadoEntrega estadoEntrega;

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL)
    private List<ProductoPedido> detallesPedido = new ArrayList<>();

}
