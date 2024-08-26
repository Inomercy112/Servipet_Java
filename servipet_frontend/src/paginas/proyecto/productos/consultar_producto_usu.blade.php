<!-- resources/productos/consultar_producto_usu.blade.php -->
@extends('layouts.app')

@section('title', 'Inicio - ServiPet')

@section('content')
  <section>
    <div class="container mt-5">
        <h1 class="text-center mb-4"></h1>



          <div class="col-md-3">
            <div class="card text-center text-black bg-secondary mb-3">
              <img src= {{asset("images/g4.jpg")}} class="card-img-top" alt="Producto 1">
              <div class="card-body">
                <h5 class="card-title">Juguete caña de pesca para gatos</h5>
                <p class="card-text">Precio: $ 25.000</p>
                <a href="../forms/login.html" class="btn btn-dark">Comprar</a>
              </div>
            </div>
          </div>


  </section>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

  @endsection
  