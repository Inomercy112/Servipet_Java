import { GoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../../../componentes/Footer";
import PlantillaDos from "../../../componentes/PlantillaDos";
import { useAuth } from "../../../context/AuthContext";
import imagen from "../../../img/Logo.png";

function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    correoUsuario: "",
    contrasenaUsuario: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8080/autenticacion/Login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            correo: formData.correoUsuario,
            contrasena: formData.contrasenaUsuario,
          }),
        }
      );

      if (response.ok) {
        const userData = await response.json();
        login(userData);
        const userRole = localStorage["RolUsuario"];
        if (userRole === "cliente" || userRole === "administrador") {
          navigate(from, { replace: true });
        } else {
          navigate("/IndexVeterinaria", { replace: true });
        }
      } else {
        const errorResult = await response.text();
        setError(errorResult);
      }
    } catch (error) {
      setError("Error en la solicitud");
    }
  };
   const handleGoogleLoginSuccess = async (response)=> {
    try{
      const googleToken = response.credential;
      const r = await fetch("http://localhost:8080/authgoogle", {
        method:"POST", 
        headers: {
          "Content-Type":"aplication/json",
        
        },
        body: JSON.stringify({token: googleToken })
      });
    }
    catch(error){
      setError("Error en la solicitud " + error)
    }
   };
   
  return (
    <PlantillaDos title="Inicio de sesión">
      <div className="container mt-7">
        <div className="row justify-content-center">
          <div className="col-10 d-md-none text-center mb-4">
            <img
              src={imagen}
              alt="Logo"
              className="img-fluid"
              style={{ maxHeight: "200px"  }}
            />
          </div>

          <div className="col-md-12 d-flex flex-column flex-md-row">
            <div className="col-md-7 d-none d-md-block text-center">
              <img
                src={imagen}
                alt="Logo"
                className="img-fluid"
                style={{ maxHeight: "400px" }}
              />
            </div>

            <div className="col-md-5 d-flex justify-content-center align-items-center">
              <div className="card2 shadow p-4 w-100 mb-7">
                <h2 className="mb-4">Iniciar Sesión</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="InputEmail" className="form-label">
                      Correo Electrónico:
                    </label>
                    <input
                      type="email"
                      id="InputEmail"
                      name="correoUsuario"
                      className="form-control"
                      value={formData.correoUsuario}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="InputPassword" className="form-label">
                      Contraseña:
                    </label>
                    <input
                      type="password"
                      minLength="6"
                      id="InputPassword"
                      name="contrasenaUsuario"
                      className="form-control"
                      value={formData.contrasenaUsuario}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {error && <div className="alert alert-danger">{error}</div>}

                  <p>
                    No tiene cuenta? <Link to="/Usuario/Registro">Cree una</Link>
                  </p>
                  <p>
                    Trabaje con nosotros :
                    <Link to="/Usuario/Registro2">Crear cuenta veterinaria</Link>
                  </p>
                  <p>
                    <Link to="/Correo-Recordar">Has olvidado tu contraseña?</Link>
                  </p>
                  <button type="submit" className="btn btn-dark">
                    Iniciar Sesión
                  </button>
                  <div className="mt-3">
                    <GoogleLogin
                    onSuccess={handleGoogleLoginSuccess}
                    />


                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </PlantillaDos>
  );
}

export default Login;