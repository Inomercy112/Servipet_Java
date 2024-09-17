import React, { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext";
import PlantillaTres from "../../componentes/PlantillaTres";
import { DatosMascotaEsp } from "../../consultas/DatosEspecificosMascota";
import { useNavigate, useParams } from "react-router-dom";

function ActualizarMascota()  {
    const {token } = useAuth();
    const {id} = useParams();
    console.log(id);

    const navegar = useNavigate();
    const [formdata, setMascota] = useState({
        nombreMascota: "",

    });
    useEffect(() =>{
        const cargarMascotas = async () =>{
            try{
                const data = await DatosMascotaEsp(token);
                setMascota(data || {
                    nombreMascota: "",


                });
            }catch(error){
                console.error('Error al cargar las mascotas ', error);
            }
        }
        cargarMascotas();
    }, [ token, id]);
    const  handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            const response = await fetch('http://localhost:8080/mascota/Actualizar',{
                method:'PUT',
                headers:{
                    'Content-Type' : "application/json",
                    'Authorization' : `Bearer ${token},`
                },
                body: JSON.stringify(formdata),

            })
            if(response.ok){
                alert("datos actualizados de la mascota");
                navegar("/mascota/consultar")
            }
        }catch(error){

        }
    }
    const handleCharge = async(e) =>{
        const [name, value ] = e.target;
        setMascota(prevState => ({
            ...prevState,
            [name] : value
        }))
    };
    
    return( 
        <PlantillaTres>
    <div className="container">
        <h2>Formulario de Mascota</h2>
        <form onsubmit={handleSubmit}>
            <div className="mb-3">
                <label for="nombre" className="form-label">Nombre:</label>
                <input 
                type="text" 
                className="form-control" 
                id="nombre" 
                value={formdata.nombreMascota}
                onChange={handleCharge}
                name="nombre" 
               />
            </div>
            
            <div className="mb-3">
                <label for="tipo" className="form-label">Tipo:</label>
                <input 
                type="text" 
                className="form-control" 
                id="tipo" 
                name="tipo" 
                value="Gato"/>
            </div>
            
            <div className="mb-3">
                <label for="edad" className="form-label">Edad:</label>
                <input 
                type="text" 
                className="form-control" 
                id="edad" 
                name="edad" 
                value="2 años"/>
            </div>
            
            <div className="mb-3">
                <label for="raza" className="form-label">Raza:</label>
                <input 
                type="text" 
                className="form-control" 
                id="raza" 
                name="raza" 
                value="Persa"/>
            </div>
            
            <div className="mb-3">
                <label for="peso" className="form-label">Peso:</label>
                <input 
                type="text" 
                className="form-control" 
                id="peso" 
                name="peso" 
                value="7" />
            </div>
            
            <div className="mb-3">
                <label for="estado" className="form-label">Estado:</label>
                <input 
                type="text" 
                className="form-control" 
                id="estado" name="estado" 
                value="Presenta antecendentes en la pata izquierda"/>
            </div>
            
            <button type="submit" className="btn btn-dark">Modificar</button>
        </form>
    </div>
    </PlantillaTres>
    )
}
export default ActualizarMascota;
