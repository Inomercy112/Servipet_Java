package com.servipet.backend.Pedido.Modelo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "metodo_entrega")
public class MetodoEntrega {
    @Id
    @Column(name = "id_metodo", nullable = false)
    private Integer id;

    @Column(name = "nombre_metodo", nullable = false, length = 20)
    private String nombreMetodo;

}