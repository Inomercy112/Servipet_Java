import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../AuthContext";
import PlantillaUno from "../../../componentes/PlantillaUno";
import { DatosUsuario } from "../../../consultas/DatosPersonales";
function DetallesPerfil (){
    const {token} = useAuth();

    const [usuario, setUsuario] = useState([]);
    useEffect(()=>{
        const cargarUsuarios = async()=>{
            try {
                const data = await DatosUsuario(token);
                setUsuario(Array.isArray(data) ? data : [data]);
            } catch(error){
                console.error('error al cargar los datos de usuario', error);
            }
        };
        cargarUsuarios();
    }, [token]);
    return (
<PlantillaUno>
    <main>
        <div className="container">
            <h2>Datos de perfil</h2>
            <table id="productosTable" className="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Documento </th>
                        <th>Fecha de Nacimiento</th>
                        <th>Dirección de Residencia</th>
                        <th>Teléfono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuario.map(usuario =>( 
                        <tr key={usuario.id}>
                            <td>{usuario.nombreUsuario}</td>
                            <td>{usuario.documento}</td>
                            <td>{usuario.fechaNacimiento}</td>
                            <td>{usuario.direccion}</td>
                            <td>{usuario.telefono}</td>
                            <td>
                                <Link to="/Usuario/Actualizar"> 
                                    <i className="bi bi-pencil-square"></i>
                                </Link>
                            </td>
                        </tr>
                        ))}
                </tbody>
            </table>
        </div>
    </main>
</PlantillaUno>
    );
}
export default DetallesPerfil;