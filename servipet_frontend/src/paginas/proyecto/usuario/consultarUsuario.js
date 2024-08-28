import React, {useRef} from "react";
import { Link } from "react-router-dom";
import PlantillaUno from "../../../componentes/PlantillaUno";
import Datatables from "../../../datatables/datatables";

function ConsultarUsuario(){
    const aplicarDT = useRef(null);
    Datatables(aplicarDT);
 
return (
    <PlantillaUno title='Consulta - Usuarios'>
<body>
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
               
                <tr>
                    <td>1022548798</td>
                    <td>Santiago Garcia</td>
                    <td>admin@gmail.com</td>
                    <td>Administrador</td>
                    <td>
                      <a href='#' onclick="confirmarCancelacion()"><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='red' className='bi bi-trash3-fill' viewBox='0 0 16 16'>
                        <path d='M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z'/>
                        </svg></a>
                    </td>
                </tr>
                <tr>
                    <td>1012538765</td>
                    <td>Juan Gonzalez</td>
                    <td>veterinaria@gmail.com</td>
                    <td>Veterinario</td>
                    <td>
                      <a href='#' onclick="confirmarCancelacion()"><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='red' className='bi bi-trash3-fill' viewBox='0 0 16 16'>
                        <path d='M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z'/>
                        </svg></a>
                    </td>
                </tr>
                <tr>
                    <td>1321152134</td>
                    <td>Pedro Barros</td>
                    <td>cliente@gmail.com</td>
                    <td>Cliente</td>
                    <td>

                    </td>
                </tr>
            </tbody>
        </table>
        <Link to='/Usuario/Registro2'><button  className="btn btn-dark"> Agregar nuevo usuario veterinario</button></Link>
          

    </div>

  

</body>
</PlantillaUno>
);
}

export default ConsultarUsuario;