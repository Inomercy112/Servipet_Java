import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PlantillaUno from "../../../componentes/PlantillaTres";
import { DatosCitas } from "../../../consultas/DatosCitas";
import { useAuth } from "../../../context/AuthContext";

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
                    <tr key={cita.idDto}>
                        <td>{cita.mascotaAsisteDto.nombreMascotaDto}</td>
                        <td>{cita.fechaCitaDto}</td>
                        <td>{cita.horaCitaDto}</td>


                        <td>{cita.estadoCitaDto.nombreEstadoCitaDto}</td>


                        
                        <td>{cita.razonDto}</td>
                        <td>{cita.diagnosticoDto || "por evaluar"}</td>
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

