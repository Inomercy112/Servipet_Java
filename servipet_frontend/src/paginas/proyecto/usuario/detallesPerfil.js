import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PlantillaUno from "../../../componentes/PlantillaUno";
import { DatosUsuario } from "../../../consultas/DatosPersonales";
import { useAuth } from "../../../context/AuthContext";
function DetallesPerfil() {
    const { token } = useAuth();

    const [usuario, setUsuario] = useState(null); 
    const [error, setError] = useState('');

    useEffect(() => {
        const cargarUsuarios = async () => {
            try {
                const data = await DatosUsuario(token);
                setUsuario(Array.isArray(data) ? data : [data]);
            } catch (error) {
                console.error('Error al cargar los datos de usuario', error);
                setError('Error al cargar los datos de usuario');
            }
        };

        cargarUsuarios();
    }, [token]);

    return (
        <PlantillaUno>
            <main>
                <div className="container">
                    <h2>Datos de perfil</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <table id="productosTable" className="table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Documento</th>
                                <th>Fecha de Nacimiento</th>
                                <th>Dirección de Residencia</th>
                                <th>Teléfono</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuario ? (
                                usuario.map((u) => (
                                    <tr key={u.idDto}>
                                        <td>{u.nombreUsuarioDto}</td>
                                        <td>{u.documentoUsuarioDto || "no tiene documento asociado"}</td>
                                        <td>{u.fechaNacimientoDto || "no tiene fecha de nacimiento asociado"}</td>
                                        <td>{u.direccionUsuarioDto || "no tiene direccion asociado"}</td>
                                        <td>{u.telefonoUsuarioDto || "no tiene telefono asociado"}</td>
                                        <td>
                                            <Link to="/Usuario/Actualizar">
                                                <i className="bi bi-pencil-square"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">Cargando...</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </PlantillaUno>
    );
}

export default DetallesPerfil;