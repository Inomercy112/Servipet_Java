import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Cambia a useNavigate
import { useAuth } from "../../AuthContext";
import PlantillaTres from "../../componentes/PlantillaTres";
import { DatosUsuario } from "../../consultas/DatosPersonales";

function ActualizarUsuario() {
    const { token } = useAuth();
    const navigate = useNavigate(); // Usa useNavigate para la redirección

    const [usuario, setUsuario] = useState({
        nombreUsuario: "",
        documento: "",
        correoUsuario: "",
        contrasenaUsuario: "",
        fechaNacimiento: "",
        direccion: "",
        telefono: ""
    });

    useEffect(() => {
        const cargarUsuarios = async () => {
            try {
                const data = await DatosUsuario(token);
                setUsuario(data || {
                    nombreUsuario: "",
                    documento: "",
                    correoUsuario: "",
                    contrasenaUsuario: "",
                    fechaNacimiento: "",
                    direccion: "",
                    telefono: ""
                });
            } catch (error) {
                console.error('Error al cargar los datos de usuario', error);
            }
        };
        cargarUsuarios();
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario(prevUsuario => ({
            ...prevUsuario,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/usuario/actualizar/${localStorage['id']}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(usuario) 
            });

            if (response.ok) {
                alert("Datos actualizados correctamente");
                navigate("/Usuario/Perfil"); 
            } else {
                alert("Error al actualizar los datos.");
            }
        } catch (error) {
            console.error("Error al enviar el formulario: ", error);
            alert("Ocurrió un error inesperado");
        }
    };

    return (
        <PlantillaTres>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <h2 className="mb-4">Actualizar Usuario</h2>
                        <form id="actualizarUsuario" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="nombre" className="form-label">Nombre:</label>
                                <input 
                                    type="text" 
                                    id="nombre" 
                                    name="nombreUsuario" 
                                    className="form-control" 
                                    required 
                                    value={usuario.nombreUsuario} 
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="documento" className="form-label">Documento:</label>
                                <input 
                                    type="text" 
                                    id="documento" 
                                    name="documento" 
                                    className="form-control" 
                                    required 
                                    value={usuario.documento}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="correo" className="form-label">Correo electrónico:</label>
                                <input 
                                    type="email" 
                                    id="correo" 
                                    name="correoUsuario" 
                                    className="form-control" 
                                    required 
                                    value={usuario.correoUsuario}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="contrasena" className="form-label">Contraseña:</label>
                                <input 
                                    type="password" 
                                    id="contrasena" 
                                    name="contrasenaUsuario" 
                                    className="form-control" 
                                    required 
                                    value={usuario.contrasenaUsuario}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento:</label>
                                <input 
                                    type="date" 
                                    id="fechaNacimiento" 
                                    name="fechaNacimiento" 
                                    className="form-control" 
                                    min="1900-01-01" 
                                    required 
                                    value={usuario.fechaNacimiento}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="direccion" className="form-label">Dirección de Residencia:</label>
                                <input 
                                    type="text" 
                                    id="direccion" 
                                    name="direccion" 
                                    className="form-control" 
                                    required 
                                    value={usuario.direccion}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="telefono" className="form-label">Teléfono:</label>
                                <input 
                                    type="tel" 
                                    id="telefono" 
                                    name="telefono" 
                                    className="form-control" 
                                    required 
                                    value={usuario.telefono}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <button type="submit" className="btn btn-dark">Actualizar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </PlantillaTres>
    );
}

export default ActualizarUsuario;
