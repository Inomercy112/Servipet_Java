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
@Table(name = "estado_entrega")
public class EstadoEntrega {
    @Id
    @Column(name = "id_estado_entrega", nullable = false)
    private Byte id;

    @Column(name = "nombre_estado", nullable = false, length = 20)
    private String nombreEstado;

}