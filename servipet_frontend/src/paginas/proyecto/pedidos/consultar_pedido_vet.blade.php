<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ganancias</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        integrity="sha512-LxPU+Bi28LrSvSH/Q+L8PNo0u52xZid5NRLN84l3opOXWz+uY7y9jeSYjsYKd7enHdMzBtGpwB0cHeiM4mJvNQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="../index/estilos.css">
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.11.5/css/jquery.dataTables.css">
</head>

<body>
    <header>
        <nav class="navbar navbar-expand-lg  ">
            <div class="container-fluid">
                <a class="navbar-brand" href="../index/veteri.html">
                    <img src="../../Proyect/ph.img/ServiPeticon.jpg" class="d-inline-block align-top" alt="Logo"
                        height="100">
                </a>
                <a class="navbar-brand " href="../index/veteri.html">ServiPet</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="../Citas/citasvet.html">Citas</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Productos
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="../Productos/productvet.html">Agregar</a></li>
                                <li><a class="dropdown-item" href="../forms/listado.html">Existentes</a></li>
                                <li><a class="dropdown-item" href="../forms/categoria.html">Categoria</a></li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="../Pedido/pedidovet.html">Pedidos</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="../forms/gananvet.html">Ganancias</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="../forms/ventasv.html">Ventas</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user"
                                    width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                    fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                </svg>
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">

                                <a class="dropdown-item" href="#" data-bs-toggle="modal"
                                    data-bs-target="#perfilModal">Perfil</a>
                                <a class="dropdown-item" href="../Perfil/usuperv.html">Configuración</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="../index/noreg.html">Cerrar sesión</a>
                            </div>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
        <div class="modal fade " id="perfilModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Perfil de Usuario</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                    </div>
                    <div class="modal-body text-center ">
                        <img src="../../Proyect/ph.img/juan.jpg" alt="Imagen de perfil">
                        <p>Nombre: Juan Gonzalez</p>
                        <p>Rol: Veterinario</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>

    </header>
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
                        <td>
                            <a href="#" onclick="mostrarAlerta()">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-check-lg" viewBox="0 0 16 16">
                                    <path
                                        d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
                                </svg>
                            </a>




                            <a href='#' onclick="Espera()"><svg xmlns="http://www.w3.org/2000/svg"
                                    width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                    class="icon icon-tabler icons-tabler-outline icon-tabler-clock">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                                    <path d="M12 7v5l3 3" />
                                </svg>
                                </svg></a>
                            <a href='#' onclick="EntregaDevuelta()"><svg xmlns='http://www.w3.org/2000/svg'
                                    width='16' height='16' fill='red' class='bi bi-trash3-fill' viewBox='0 0 16 16'>
                                    <path
                                        d='M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z' />
                                </svg></a>
                        </td>

                    </tr>
                    <tr>

                        <td>


                            Pedro Barros realizó un pedido en el carrito de compras por un total de $25.000. El pedido
                            incluye:

                            1 unidad de Alimento balanceado premium para gatos por $8.000.
                            3 unidades de Cepillo de dientes para perros por $5.000 cada uno.
                            2 unidades de Champú hipoalergénico para mascotas por $3.500 cada uno.</td>
                        <td>
                            <a href="#" onclick="mostrarAlerta()">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-check-lg" viewBox="0 0 16 16">
                                    <path
                                        d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
                                </svg>
                            </a>




                            <a href='#' onclick="Espera()"><svg xmlns="http://www.w3.org/2000/svg"
                                    width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                    class="icon icon-tabler icons-tabler-outline icon-tabler-clock">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                                    <path d="M12 7v5l3 3" />
                                </svg>
                                </svg></a>
                            <a href='#' onclick="EntregaDevuelta()"><svg xmlns='http://www.w3.org/2000/svg'
                                    width='16' height='16' fill='red' class='bi bi-trash3-fill' viewBox='0 0 16 16'>
                                    <path
                                        d='M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z' />
                                </svg></a>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    </main>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
    <script>
        $(document).ready(function () {
            $('#productosTable').DataTable();
        });
    </script>
    <script>

        $(document).ready(function () {
            $('#tablaUsuarios').DataTable();
        });
    </script>
    <script>
        function mostrarAlerta() {
            alert("La entrega ha sido aceptada.");
        }
    </script>
    <script>
        function EntregaDevuelta() {
            alert("La entrega ha sido cancelada");
        }
        
    </script>
     <script>
        function Espera() {
            alert("La entrega esta en espera.");
        }
    </script>
</body>

</html>