<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registro mascota</title>
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
                <div class="dropdown-divider"></div>
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
    <h1>Registro de Mascota</h1>
    <form >
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre de la Mascota</label>
        <input type="text" class="form-control" id="nombre" name="nombre" required>
      </div>
      <div class="mb-3">
        <label for="tipo" class="form-label">Tipo de Mascota</label>
        <select class="form-select" id="tipo" name="tipo" required>
          <option value="">Selecciona el tipo de mascota</option>
          <option value="Perro">Perro</option>
          <option value="Gato">Gato</option>
          <option value="Ave">Ave</option>
          <option value="Roedor">Roedor</option>
          <option value="Reptil">Reptil</option>
          <option value="Otro">Otro</option>
        </select>
      </div>
      <div class="row mb-3">
        <div class="col">
          <label for="edad" class="form-label">Edad</label>
          <input type="number" class="form-control" id="edad" name="edad" min="0" required>
        </div>
        <div class="col">
          <label for="raza" class="form-label">Raza</label>
          <input type="text" class="form-control" id="raza" name="raza">
        </div>
      </div>
      <div class="row mb-3">
        <div class="col">
          <label for="peso" class="form-label">Peso (kg)</label>
          <input type="number" class="form-control" id="peso" name="peso" min="0" step="0.01" required>
        </div>
        <div class="col">
          <label for="antecedentes" class="form-label">Antecedentes</label>
          <textarea class="form-control" id="antecedentes" name="antecedentes" rows="3"></textarea>
        </div>
      </div>
      <button type="submit" class="btn btn-dark">Registrar Mascota</button>
    </form>
  </div>
  
</body>
</html>
