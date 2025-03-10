import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PlantillaUno from "../../../componentes/PlantillaUno";
import { DatosUsuario } from "../../../consultas/DatosUsuario";
import { useAuth } from '../../../context/AuthContext';
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
        try {
        fetch(`http://localhost:8080/usuario/Desactivar/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
    }catch(e){
        alert("error al desactivar"+ e);
    }
    };

    return (
        <PlantillaUno title='Consulta - Usuarios'>

            <div className="container ">
                <h2>Usuarios</h2>
                <table ref={aplicarDT} className="table">
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
                            <tr key={usuario.idDto}>
                                <td>{usuario.documentoUsuarioDto}</td>
                                <td>{usuario.nombreUsuarioDto}</td>
                                <td>{usuario.correoUsuarioDto}</td>
                                <td>{usuario.rolUsuarioDto}</td>
                                <td>
                                    <Link to="#" onClick={() => desactivarUsuario(usuario.idDto)}>
                                        <i className="bi bi-trash"></i>
                                    </Link>
                                </td>
                            </tr>
                        )
                        
                        )}
                    </tbody>
                </table>
            </div>
        </PlantillaUno>
    );
}

export default ConsultarUsuario;
