import React from "react";
import { Link } from "react-router-dom";
import PlantillaDos from "../../../componentes/PlantillaDos";
function Login() {
    return (
    <PlantillaDos title="Inicio de sesion">
  
    <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-6">
                <h2 className="mb-4">Iniciar Sesión</h2>
                <form > 
                    <div className="mb-3">
                        <label htmlForfor="InputEmail" className="form-label">Correo Electrónico:</label> 
                        <input type="email" id="InputEmail" name="correo" className="form-control" required />
                    </div>
                    <div className="mb-3">
                        <label htmlfor="InputPassword" className="form-label">Contraseña:</label> 
                        <input type="password" id="InputPassword" name="contrasena" className="form-control" required />
                    </div>
                    <p>No tiene cuenta? <Link to='/Usuario/Registro' >Cree una</Link></p>
                    <button type="submit" className="btn btn-dark">Iniciar Sesión</button>
                    
                </form>
            </div>
        </div>
    </div>
    </PlantillaDos>
);
}
export default Login;