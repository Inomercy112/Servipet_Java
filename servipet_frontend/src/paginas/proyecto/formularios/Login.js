import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../AuthContext";
import PlantillaDos from "../../../componentes/PlantillaDos";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth(); 
    const [formData, setFormData] = useState({
        correoUsuario: '',
        contrasenaUsuario: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/autenticacion/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', 
                body: JSON.stringify({
                    correo: formData.correoUsuario,
                    contrasena: formData.contrasenaUsuario
                }),
            });
           

            if (response.ok) {
                const userData = await response.json(); 
                
                login(userData); 
                navigate("/"); 
            } else {
                const errorResult = await response.text();
                setError(errorResult); 
            }
        } catch (error) {
            setError('Error en la solicitud');
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
