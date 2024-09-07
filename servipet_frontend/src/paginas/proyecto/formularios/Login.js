import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PlantillaDos from "../../../componentes/PlantillaDos";

function Login() {
    const [formData, setFormData] = useState({
        correoUsuario: "",
        contrasenaUsuario: "",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); 

        try {
            const response = await fetch("http://localhost:8080/usuario/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token); 
                alert("Inicio de sesión exitoso");
                navigate("/"); 
            } else {
                setError("Correo o contraseña incorrectos");
            }
        } catch (error) {
            console.error("Error en el login:", error);
            setError("Ocurrió un error inesperado");
        }
    };

    return (
        <PlantillaDos title="Inicio de sesión">
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <h2 className="mb-4">Iniciar Sesión</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="InputEmail" className="form-label">Correo Electrónico:</label>
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
                                <label htmlFor="InputPassword" className="form-label">Contraseña:</label>
                                <input
                                    type="password"
                                    id="InputPassword"
                                    name="contrasenaUsuario"
                                    className="form-control"
                                    value={formData.contrasenaUsuario}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <p>No tiene cuenta? <Link to='/Usuario/Registro'>Cree una</Link></p>
                            <button type="submit" className="btn btn-dark">Iniciar Sesión</button>
                        </form>
                    </div>
                </div>
            </div>
        </PlantillaDos>
    );
}

export default Login;
