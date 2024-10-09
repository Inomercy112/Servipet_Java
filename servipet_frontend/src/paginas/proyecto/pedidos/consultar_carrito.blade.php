    
        <div class="container">
            <h2>Carrito de compras</h2>
            <table id="productosTable" class="table">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Nombre</th>
                        <th>cantidad</th>
                        <th>Valor</th>
                        <th>Acciones</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><img src="../ph.img/c4.jpg"></td>
                        <td>DentaLife raza Grande 196 g</td>
                        <td>1</td>
                        <td>$ 5.000</td>

                        <td>
                            <a href='#' onclick="confirmarCancelacion()"><svg xmlns='http://www.w3.org/2000/svg'
                                    width='16' height='16' fill='red' class='bi bi-trash3-fill' viewBox='0 0 16 16'>
                                    <path
                                        d='M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z' />
                                </svg></a>
                        </td>
                    </tr>
                    <tr>
                        <td><img src="../ph.img/c2.jpg"></td>
                        <td>Dental Fresh Spray Oral 4 Oz.</td>
                        <td>2</td>
                        <td>$ 10.000</td>

                        <td>
                            <a href='#' onclick="confirmarCancelacion()"><svg xmlns='http://www.w3.org/2000/svg'
                                    width='16' height='16' fill='red' class='bi bi-trash3-fill' viewBox='0 0 16 16'>
                                    <path
                                        d='M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z' />
                                </svg></a>
                        </td>
                    </tr>
                </tbody>
            </table>

            <form action="../Pedido/finalizar.html">
                <button type="submit" class="btn btn-dark"> Ir a pagar</button>
            </form>
        </div>
    <script>
        function confirmarCancelacion() {
            if (confirm("¿Seguro que quieres eliminar este producto?")) {
                alert("Este servicio esta deshabilitado por el momento");
            } else {
                return false;
            }
        }
    </script>
