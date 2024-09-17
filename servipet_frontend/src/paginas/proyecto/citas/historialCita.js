import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PlantillaUno from "../../../componentes/PlantillaUno";
import { useAuth } from "../../../AuthContext";
import {DatosCitas} from "../../../consultas/DatosCitas";

function HistorialCita(){
    const {token} = useAuth();
    const [citas, setcitas] = useState([]);

    useEffect(() =>{
        const cargarCitas = async () =>{
            try{
                const data = await DatosCitas(token);
                setcitas(Array.isArray(data) ? data : [data]);
            } catch (error){
                console.error("Error al cargar las citas", citas);
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
                        <th>Mascota atendida</th>
                        <th>Razón </th>
                        <th>Diagnostico</th>
                    </tr>
                </thead>
                <tbody>
                    {citas.map((cita) =>(
                    <tr>
                        <td>Fredy</td>
                        <td>Ha estado mostrando algunos signos de malestar últimamente. Ha perdido un poco el apetito y parece estar un poco menos activo de lo normal. Estoy preocupado(a) por su salud y quiero asegurarme de que reciba la atención adecuada lo antes posible. </td>
                        <td>Basado en el examen físico realizado, no se encontraron hallazgos clínicos anormales. Fredy parece estar en buen estado de salud en este momento. Se recomienda continuar con una dieta equilibrada, ejercicio regular y chequeos veterinarios periódicos para mantener su bienestar a largo plazo. ATT: Paco Villa</td>    
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

