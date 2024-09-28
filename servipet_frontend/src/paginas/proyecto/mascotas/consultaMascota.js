import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../AuthContext";
import PlantillaTres from "../../../componentes/PlantillaTres";
import { DatosMascota } from "../../../consultas/DatosMascota";

function ConsultarMascota() {
    const { token } = useAuth();
    const [mascotas, setMascotas] = useState([]);


    useEffect(() => {
        const cargarMascotas = async () => {
            try {
                const data = await DatosMascota(token);
                setMascotas(Array.isArray(data) ? data : [data]);
            } catch (error) {
                console.error("Error al cargar las mascotas", error);
            }
        };
        cargarMascotas();
    }, [token]);

    return (
        <PlantillaTres>
            <main>
                <div className="container">
                    <h2>Tus Mascotas</h2>
                    <table id="productosTable" className="table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Tipo de mascota</th>
                                <th>Edad</th>
                                <th>Raza</th>
                                <th>Peso kg</th>
                                <th>Antecedentes</th>
                                <th>Acciones</th>
                            
                            </tr>
                        </thead>
                        <tbody>
                            {mascotas.length > 0 ? (
                                mascotas.map((mascota) => (
                                    
                                    <tr key={mascota.id}>
                                        <td>{mascota.nombreMascota}</td>
                                        <td>{mascota.tipo.nombreTipo}</td>
                                        <td>{mascota.fechaNacimientoMascota}</td>
                                        <td>{mascota.raza}</td>
                                        <td>{mascota.pesoKg}</td>
                                        <td>{mascota.antecedentes || "No tiene antecedentes médicos"}</td>
                                        <td>
                                            <Link to={`/Mascota/Actualizar/${mascota.id}`}>
                                                <i className="bi bi-pencil-square"></i>
                                            </Link>
                                            <Link to={`/mascota/eliminar/${mascota.id}`}>
                                                <i className="bi bi-trash"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7">No tienes mascotas registradas</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <Link to="/Mascota/Registrar">
                        <button className="btn btn-dark">Agregar nueva mascota</button>
                    </Link>
                </div>
            </main>
        </PlantillaTres>
    );
}

export default ConsultarMascota;
