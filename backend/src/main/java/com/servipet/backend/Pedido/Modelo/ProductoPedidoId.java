package com.servipet.backend.Pedido.Modelo;

import jakarta.persistence.Embeddable;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Embeddable
@Getter
@Setter
@EqualsAndHashCode
public class ProductoPedidoId implements Serializable {
    private Integer productoId;
    private int pedidoId;


}
