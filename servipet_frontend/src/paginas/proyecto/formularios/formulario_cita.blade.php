<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Citas</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
    crossorigin="anonymous"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
    integrity="sha512-LxPU+Bi28LrSvSH/Q+L8PNo0u52xZid5NRLN84l3opOXWz+uY7y9jeSYjsYKd7enHdMzBtGpwB0cHeiM4mJvNQ=="
    crossorigin="anonymous" referrerpolicy="no-referrer" />
  <link rel="stylesheet" href="../index/estilos.css">
</head>

<body>
  <header>
    <nav class="navbar navbar-expand-lg  ">
      <div class="container-fluid">
        <a class="navbar-brand" href="../index/asd.html">
          <img src="../../Proyect/ph.img/ServiPeticon.jpg" class="d-inline-block align-top" alt="Logo" height="100">
        </a>
        <a class="navbar-brand " href="../index/asd.html">ServiPet</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="../Citas/citasg.html">Citas</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                Productos
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="../Productos/menur2.html">Secos</a></li>
                <li><a class="dropdown-item" href="../Productos/menur1.html">Humedos</a></li>
                <li><a class="dropdown-item" href="../Productos/menur3.html">Belleza/Higiene</a></li>
                <li><a class="dropdown-item" href="../Productos/menur4.html">Juguetes</a></li>
              </ul>
            </li>
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="../Pedido/pedido.html">
                    Carrito
                    <span class="badge bg-danger">2</span>
                </a>
            </li>
            <form class="d-flex " role="search">
              <input class="form-control me-2" type="search" placeholder="Buscar" aria-label="Search">
              <button class="btn btn-outline-success" type="submit">Buscar</button>
            </form>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user" width="24" height="24"
                  viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round"
                  stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                </svg>
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">

                <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#perfilModal">Perfil</a>
                <a class="dropdown-item" href="../Perfil/usuper.html">Configuración</a>
                <a class="dropdown-item" href="../Macotas/mascotagen.html">Tu mascota</a>
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
            <img src="../../Proyect/ph.img/pedro.jpg" alt="Imagen de perfil">
            <p>Nombre: Pedro Barros</p>
            <p>Rol: Cliente</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>

  </header>
<body>
    
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <h2 class="mb-4">Formulario de Citas</h2>
                <form action="../Error/500.html" >
                    <div class="mb-3">
                        <label for="descripcion" class="form-label">Descripción:</label>
                        <textarea id="descripcion" name="descripcion" class="form-control" required></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="fecha_cita" class="form-label">Fecha de la Cita:</label>
                        <input type="date" id="fecha_cita" name="fecha_cita" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label for="veterinaria" class="form-label">Que mascota asiste</label>
                        <select id="veterinaria" name="veterinaria" class="form-select" required>
                            <option value="" disabled selected>Selecciona tu mascota</option>
                            <option value="veterinaria1">Mascota 1</option>
                            <option value="veterinaria2">Mascota 2</option>
                            <option value="veterinaria3">Mascota 3</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="hora_cita" class="form-label">Hora de la Cita:</label>
                        <input type="time" id="hora_cita" name="hora_cita" class="form-control" required>
                    </div>
                    <button type="submit" class="btn btn-dark">Programar Cita</button>
                </form>
            </div>
        </div>
    </div>
</body>
</html>
