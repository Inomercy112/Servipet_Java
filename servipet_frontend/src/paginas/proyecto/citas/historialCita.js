import React from "react";
import { Link } from "react-router-dom";
import PlantillaUno from "../../../componentes/PlantillaUno";

function historialCita(){
return(
    <PlantillaUno>
    <body>
    <main>
        <div class="container">
            <h2>Historial de citas</h2>
            <table id="productosTable" class="table">
                <thead>
                    <tr>
                        <th>Mascota atendida</th>
                        <th>Razón </th>
                        <th>Diagnostico</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Fredy</td>
                        <td>Ha estado mostrando algunos signos de malestar últimamente. Ha perdido un poco el apetito y parece estar un poco menos activo de lo normal. Estoy preocupado(a) por su salud y quiero asegurarme de que reciba la atención adecuada lo antes posible. </td>
                        <td>Basado en el examen físico realizado, no se encontraron hallazgos clínicos anormales. Fredy parece estar en buen estado de salud en este momento. Se recomienda continuar con una dieta equilibrada, ejercicio regular y chequeos veterinarios periódicos para mantener su bienestar a largo plazo. ATT: Paco Villa</td>    
                    </tr>
                    <tr>
                        <td>Limon</td>
                        <td>Ha estado mostrando algunos signos de malestar últimamente. Ha perdido un poco el apetito y parece estar un poco menos activo de lo normal. Estoy preocupado(a) por su salud y quiero asegurarme de que reciba la atención adecuada lo antes posible. </td>
                        <td>Basado en el examen físico realizado, no se encontraron hallazgos clínicos anormales. Limon parece estar en buen estado de salud en este momento. Se recomienda continuar con una dieta equilibrada, ejercicio regular y chequeos veterinarios periódicos para mantener su bienestar a largo plazo. ATT: Juan Gonzalez</td>
                    </tr>
                    <tr>
                        <td>Fredy</td>
                        <td>Ha estado mostrando algunos signos de malestar últimamente. Ha perdido un poco el apetito y parece estar un poco menos activo de lo normal. Estoy preocupado(a) por su salud y quiero asegurarme de que reciba la atención adecuada lo antes posible. </td>
                        <td>Basado en el examen físico realizado, no se encontraron hallazgos clínicos anormales. Fredy parece estar en buen estado de salud en este momento. Se recomienda continuar con una dieta equilibrada, ejercicio regular y chequeos veterinarios periódicos para mantener su bienestar a largo plazo. ATT: Paco Villa</td>
                    </tr>
                    <tr>
                        <td>Fredy</td>
                        <td>Ha estado mostrando algunos signos de malestar últimamente. Ha perdido un poco el apetito y parece estar un poco menos activo de lo normal. Estoy preocupado(a) por su salud y quiero asegurarme de que reciba la atención adecuada lo antes posible. </td>
                        <td>Pendiente para el día 05/07/2024  <a href="#" onclick="confirmarCancelacion()">cancelar</a></td>
                    </tr>
                </tbody>
            </table>
            <Link to='/Cita/Registrar'>
                <button  class="btn btn-dark">Programar nueva cita</button>
            </Link>
        </div>
    </main>
    </body>
    </PlantillaUno>
);
}
export default historialCita;

