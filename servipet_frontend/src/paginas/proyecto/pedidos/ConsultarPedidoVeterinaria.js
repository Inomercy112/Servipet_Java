import React from "react";

const ConsultarPedidoVeterinaria = () => {
    return (
        <main>
        <div class="container">
            <h2>Estado de los pedidos </h2>
            <table id="productosTable" class="table">
                <thead>
                    <tr>
                        <th>Descripción</th>
                        <th>Grafica</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            El cliente Pedro Barros realizó un pedido en el carrito de compras que incluye los
                            siguientes productos:
    
                            Producto: DentaLife raza Grande 196 g
    
                            Cantidad: 1
                            Valor unitario: $5.000
                            Producto: Dental Fresh Spray Oral 4 Oz.
    
                            Cantidad: 2
                            Valor unitario: $10.000</td>
                    </tr>
                    <tr>
    
                        <td>
                            Pedro Barros realizó un pedido en el carrito de compras por un total de $25.000. El pedido
                            incluye:
    
                            1 unidad de Alimento balanceado premium para gatos por $8.000.
                            3 unidades de Cepillo de dientes para perros por $5.000 cada uno.
                            2 unidades de Champú hipoalergénico para mascotas por $3.500 cada uno.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
    );


}
export default ConsultarPedidoVeterinaria;

