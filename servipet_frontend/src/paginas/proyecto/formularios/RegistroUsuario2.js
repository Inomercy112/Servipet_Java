import React from "react";
import PlantillaUno from "../../../componentes/PlantillaUno";

function RegistroUsuario2(){

return(
    <PlantillaUno>
<body>    
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <h2 class="mb-4">Registro de Usuario</h2>
                <form action="../Error/500.html" id="registroUsuario">
                    <div class="mb-3">
                        <label for="nombre" class="form-label">Nombre:</label>
                        <input type="text" id="nombre" name="nombre" class="form-control" required />
                    </div>
                    <div class="mb-3">
                        <label for="telefono" class="form-label">Documento:</label>
                        <input type="tel" id="documento" name="documento" class="form-control" required />
                    </div>
                    <div class="mb-3">
                        <label for="correo" class="form-label">Correo electrónico:</label>
                        <input type="email" id="correo" name="correo" class="form-control" required />
                    </div>
                    <div class="mb-3">
                        <label for="contrasena" class="form-label">Contraseña:</label>
                        <input type="password" id="contrasena" name="contrasena" class="form-control" required />
                    </div>
                    <div class="mb-3">
                        <label for="fechaNacimiento" class="form-label">Fecha de Nacimiento:</label>
                        <input type="date" id="fechaNacimiento" name="fechaNacimiento" class="form-control" min="1900-01-01" required />
                    </div>
                    <div class="mb-3">
                        <label for="direccion" class="form-label">Dirección de Residencia:</label>
                        <input type="text" id="direccion" name="direccion" class="form-control" required />
                    </div>
                    <div class="mb-3">
                        <label for="telefono" class="form-label">Teléfono:</label>
                        <input type="tel" id="telefono" name="telefono" class="form-control" required />
                    </div>
                    <div>
                        <button type="submit" class="btn btn-dark">Registrarse</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

</body>

</PlantillaUno>
);
}
export default RegistroUsuario2;