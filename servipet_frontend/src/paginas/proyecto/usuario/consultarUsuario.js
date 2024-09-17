import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../../../AuthContext';
import PlantillaUno from "../../../componentes/PlantillaUno";
import { DatosUsuario } from "../../../consultas/DatosUsuario";
import Datatables from "../../../datatables/datatables";
function ConsultarUsuario() {
    const { token } = useAuth();

    const aplicarDT = useRef(null);
    const [usuarios, setUsuarios] = useState([]);
    useEffect(()=>{
        const cargarUsuarios = async()=>{
            try {
                const data = await DatosUsuario(token);
                setUsuarios(data);
            } catch(error){
                console.error('error al cargar los usuarios:', error);
            }
        };
        cargarUsuarios();
    }  ,[token]);

    useEffect(() => {
        if (usuarios.length > 0) {
            Datatables(aplicarDT);
        }
        else{
            
        }
    }, [usuarios]);

    const desactivarUsuario = (id) => {
        fetch(`http://localhost:8080/usuario/desactivar/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log("Usuario desactivado:", data);
            
            setUsuarios(prevUsuarios => prevUsuarios.filter(usuario => usuario.id !== id));
        })
        .catch(error => console.error('Error:', error));
    };
 

    return (
        <PlantillaUno title='Consulta - Usuarios'>

            <div className="container mt-5">
                <h2>Usuarios</h2>
                <table ref={aplicarDT} className="display">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Correo Electrónico</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map(usuario => (
                            <tr key={usuario.id}>
                                <td>{usuario.documento}</td>
                                <td>{usuario.nombreUsuario}</td>
                                <td>{usuario.correoUsuario}</td>
                                <td>{usuario.rol["nombreRol"]}</td>
                                <td>
                                    <Link to="#" onClick={() => desactivarUsuario(usuario.id)}>
                                        <i className="bi bi-trash"></i>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Link to='/Usuario/Registro2'>
                    <button className="btn btn-dark">Agregar nuevo usuario veterinario</button>
                </Link>
            </div>
        </PlantillaUno>
    );
}

export default ConsultarUsuario;
