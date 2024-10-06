import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../AuthContext";
import PlantillaUno from "../../../componentes/PlantillaTres";
import { DatosCitas } from "../../../consultas/DatosCitas";

function HistorialCita(){
    const {token} = useAuth();
    const [citas, setcitas] = useState([]);

    useEffect(() =>{
        const cargarCitas = async () =>{
            try{
                const data = await DatosCitas(token);
                setcitas(Array.isArray(data) ? data : [data]);
            } catch (error){
                console.error("Error al cargar las citas", error);
            }

        };
        cargarCitas();
    }, [token]);
return(
    <PlantillaUno>
    <main>
        <div className="container">
            <h2>Historial de citas</h2>
            <table id="productosTable" className="table">
                <thead>
                    <tr>
                        <th>Nombre de la mascota</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Estado de la cita</th>
                        <th>Razón</th>
                        <th>Diagnostico</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {citas.map((cita) =>(
                    <tr key={cita.id}>
                        <td>{cita.mascotaAsiste.nombreMascota}</td>
                        <td>{cita.fechaCita}</td>
                        <td>{cita.horaCita}</td>
                        <td>{cita.estadoCita.nombreEstadoCita}</td>
                        <td>{cita.razon}</td>
                        <td>{cita.diagnostico}</td>
                    </tr>
                    ))}

                </tbody>
            </table>
            <Link to='/Cita/Registrar'>
                <button  className="btn btn-dark">Programar nueva cita</button>
            </Link>
        </div>
    </main>

    </PlantillaUno>
);
}
export default HistorialCita;

