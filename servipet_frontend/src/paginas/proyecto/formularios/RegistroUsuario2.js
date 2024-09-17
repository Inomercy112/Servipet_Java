import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlantillaUno from "../../../componentes/PlantillaUno";

const RegistroUsuario2 =() =>{
const dirigir = useNavigate();
const [formData, setFormData] = useState({
    nombreUsuario: "",
    documento: "",
    correoUsuario: "",
    contrasenaUsuario :"",
    fechaNacimiento : "",
    direccion:"",

    telefono: "",
    rol:{
        id:2
    },
    estado:{
        id:1
    }

});
const handleChange = (e)=>{
    const {name, value} = e.target;
    setFormData(prevState => ({
        ...prevState,
        [name]: value
    })); 
};
const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
        const response = await fetch("http://localhost:8080/usuario/Registrar",{
            method: "POST",
            headers :{
                "Content-type" :"application/json"
            },
            body: JSON.stringify(formData)
        });
        if(response.ok){
            alert("usuario registrado");
            dirigir("/Usuario/Consultar")

        }
        else{
            alert("usuario no se pudo registrar", response);
        }
    }catch(error){
        console.error("error al registrar el usuario", error);
    }
}
return(
    <PlantillaUno>
<body>    
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <h2 class="mb-4">Registro de Usuario</h2>
                <form onSubmit={handleSubmit} id="registroUsuario">
                    <div class="mb-3">
                        <label htmlFor="nombreUsuario" class="form-label">Nombre:</label>
                        <input 
                        type="text" 
                        id="nombreUsuario" 
                        name="nombreUsuario" 
                        class="form-control" 
                        onChange={handleChange}
                        value={formData.nombreUsuario}
                        required />
                    </div>
                    <div class="mb-3">
                        <label htmlFor="telefono" class="form-label">Documento:</label>
                        <input 
                        type="tel" 
                        id="documento" 
                        name="documento" 
                        class="form-control" 
                        onChange={handleChange}
                        value={formData.documento}
                        required />
                    </div>
                    <div class="mb-3">
                        <label htmlFor="correoUsuario" class="form-label">Correo electrónico:</label>
                        <input 
                        type="email" 
                        id="correoUsuario" 
                        name="correoUsuario" 
                        class="form-control" 
                        onChange={handleChange}
                        value={formData.correoUsuario}
                        required />
                    </div>
                    <div class="mb-3">
                        <label htmlFor="contrasenaUsuario" class="form-label">Contraseña:</label>
                        <input 
                        type="password" 
                        id="contrasenaUsuario" 
                        name="contrasenaUsuario" 
                        class="form-control" 
                        onChange={handleChange}
                        value={formData.contrasenaUsuario}
                        required />
                    </div>
                    <div class="mb-3">
                        <label htmlFor="fechaNacimiento" class="form-label">Fecha de Nacimiento:</label>
                        <input 
                        type="date" 
                        id="fechaNacimiento" 
                        name="fechaNacimiento" 
                        class="form-control" 
                        min="1900-01-01" 
                        onChange={handleChange}
                        value={formData.fechaNacimiento}
                        required />
                    </div>
                    <div class="mb-3">
                        <label htmlFor="direccion" class="form-label">Dirección de Residencia:</label>
                        <input 
                        type="text" 
                        id="direccion" 
                        name="direccion" 
                        class="form-control"
                        onChange={handleChange}
                        value={formData.direccion}
                        required />
                    </div>
                    <div class="mb-3">
                        <label htmlFor="telefono" class="form-label">Teléfono:</label>
                        <input 
                        type="tel" 
                        id="telefono" 
                        name="telefono" 
                        class="form-control"
                        onChange={handleChange}
                        value={formData.telefono}
                        required />
                    </div>
                    <div>
                        <button type="submit" class="btn btn-dark">Registrarse</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

</body>

</PlantillaUno>
);
}
export default RegistroUsuario2;