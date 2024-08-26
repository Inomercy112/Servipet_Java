<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ganancias Mensuales</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
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
        <a class="navbar-brand" href="../index/admin.html">
          <img src="../../Proyect/ph.img/ServiPeticon.jpg" class="d-inline-block align-top" alt="Logo" height="100">
        </a>
        <a class="navbar-brand " href="../index/admin.html  ">ServiPet</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="../forms/usuarios.html">Usuarios</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="../forms/productos.html">Productos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="../forms/ventas.html">Ventas</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="../forms/ganancias.html">Ganancias</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user" width="24" height="24"
                  viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round"
                  stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                </svg>
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#perfilModal">Perfil</a>
                <a class="dropdown-item" href="../Error/404.html">Configuración</a>
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
            <img src="../../Proyect/ph.img/middle-aged-cheerful-dark-skinned-male-with-shining-smile.jpg" alt="Imagen de perfil">
            <p>Nombre: Santiago Garcia</p>
            <p>Rol: Administrador</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  </header>
    <div class="container">
        <h1 class="mt-5">Ganancias Mensuales</h1>
        <canvas id="gananciasChart" style="width: 100%; height: 400px;"></canvas>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            var ctx = document.getElementById('gananciasChart').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                    datasets: [{
                        label: 'Ganancias',
                        data: [160000, 400000, 690000, 453000, 679000, 469300, 369000, 705000, 450000, 780000, 190000, 14000],
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        });
    </script>
</body>
</html>
