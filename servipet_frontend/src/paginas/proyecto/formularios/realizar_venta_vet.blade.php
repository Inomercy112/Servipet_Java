<!-- resources/views/proyecto/formularios/login.blade.php -->
@extends('layouts.app2')

@section('title', 'Carrito')

@section('content')
    <div class="container mt-5">
        <h2>Registro de Venta</h2>
        <form>
            <div class="mb-3">
                <label for="valorVenta" class="form-label">Valor de Venta:</label>
                <input type="text" id="valorVenta" class="form-control" placeholder="Ingrese el valor de la venta">
            </div>
            <div class="mb-3">
                <label for="vendedor" class="form-label">Vendedor:</label>
                <input type="text" id="vendedor" class="form-control" value="Juan Gonzalez" readonly>
            </div>
            <div class="mb-3">
                <label for="productos" class="form-label">Productos Comprados:</label>
                <select id="productos" class="form-select" multiple>
                    <option value="1">Whiskas Adulto Salmon 85g</option>
                    <option value="2">Felix Húmeda Paté Atún 156 g</option>
                    <option value="3">Hills Science Diet Gato  5.5 oz</option>
                    <option value="5">Royal Canin feline 0.085 Kg</option>
                    <option value="6">Dr Clauders MN Cat 3 100 g</option>
                    <option value="7">Michicko Salmón y Atún 14 g</option>
                    <option value="8">Nutrion Concentrado 15 Kg</option>
                </select>
            </div>
            <div class="mb-3">
                <button type="button" class="btn btn-dark" onclick="mostrarAlerta()">Guardar Venta</button>
            </div>

            <script>
                function mostrarAlerta() {
                    alert("Venta registrada correctamente.");
                }
            </script>
@endsection

