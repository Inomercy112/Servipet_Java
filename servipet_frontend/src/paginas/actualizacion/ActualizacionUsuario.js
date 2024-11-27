
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Cambia a useNavigate
import { useAuth } from "../../AuthContext";
import PlantillaTres from "../../componentes/PlantillaTres";
import { DatosUsuario } from "../../consultas/DatosPersonales";

function ActualizarUsuario() {
    const { token } = useAuth();
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState({
        nombreUsuarioDto: "",
        documentoUsuarioDto: "",
        correoUsuarioDto: "",
        contrasenaUsuarioDto: "",
        fechaNacimientoDto: "",
        direccionUsuarioDto: "",
        telefonoUsuarioDto: "",
        rolUsuarioDto: "",
        estadoUsuarioDto: ""
        
    });

    useEffect(() => {
        const cargarUsuarios = async () => {
            try {
                const data = await DatosUsuario(token);
                setUsuario(
                    {
                    nombreUsuarioDto: data?.nombreUsuarioDto || "",
                    documentoUsuarioDto: data?.documentoUsuarioDto || "",
                    correoUsuarioDto: data?.correoUsuarioDto || "",
                    fechaNacimientoDto: data?.fechaNacimientoDto || "",
                    direccionUsuarioDto: data?.direccionUsuarioDto || "",
                    telefonoUsuarioDto: data?.telefonoUsuarioDto || "",
                    rolUsuarioDto : data?.rolUsuarioDto || "" ,
                    estadoUsuarioDto: data?.estadoUsuarioDto || ""
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
            const usuarioFiltrado = Object.fromEntries(
                Object.entries(usuario).filter(([key, value])=> value !== "")
            );
            const response = await fetch(
                `http://localhost:8080/usuario/Actualizar/${localStorage['id']}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(usuarioFiltrado)
            });

            if (response.ok) {
                alert("Datos actualizados correctamente");
                navigate("/Usuario/Perfil");
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
                                    name="nombreUsuarioDto"
                                    className="form-control"
                                    value={usuario.nombreUsuarioDto}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="documento" className="form-label">Documento:</label>
                                <input
                                    type="number"
                                    id="documento"
                                    name="documentoUsuarioDto"
                                    className="form-control"
                                    value={usuario.documentoUsuarioDto}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="correo" className="form-label">Correo electrónico:</label>
                                <input
                                    type="email"
                                    id="correo"
                                    name="correoUsuarioDto"
                                    className="form-control"
                                    required
                                    value={usuario.correoUsuarioDto}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="contrasena" className="form-label">Contraseña:</label>
                                <input
                                    type="password"
                                    id="contrasena"
                                    name="contrasenaUsuarioDto"
                                    value={usuario.contrasenaUsuarioDto || ""}
                                    className="form-control"
                                    required
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento:</label>
                                <input
                                    type="date"
                                    id="fechaNacimiento"
                                    name="fechaNacimientoDto"
                                    className="form-control"
                                    min="1900-01-01"
                                    value={usuario.fechaNacimientoDto}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="direccion" className="form-label">Dirección de Residencia:</label>
                                <input 
                                    type="text" 
                                    id="direccion" 
                                    name="direccionUsuarioDto" 
                                    className="form-control" 
                                    value={usuario.direccionUsuarioDto}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="telefono" className="form-label">Teléfono:</label>
                                <input 
                                    type="tel" 
                                    id="telefono" 
                                    name="telefonoUsuarioDto" 
                                    className="form-control" 
                                    value={usuario.telefonoUsuarioDto}
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
