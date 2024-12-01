import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import PlantillaTres from "../../../componentes/PlantillaUno";
import { DatosMascota } from "../../../consultas/DatosMascota";
import { useAuth } from "../../../context/AuthContext";


function ConsultarMascota() {
    const { token } = useAuth();
    const [mascotas, setMascotas] = useState([]);
    const dirigir = useNavigate();
    const ReporteMascota = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/mascota/Reporte-cita-mascota/${id}`, {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            if(!response.ok){
            alert("error con el pdf");
            return;
            }
            const pdfBlob = await response.blob();
            const url = window.URL.createObjectURL(pdfBlob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `^Reporte_Citas_Mascota_${id}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (e) {
            console.log("Error", e);
        }
    }

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
    const desactivarMascota = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/mascota/Eliminar/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });
            if (response.ok) {
                alert("mascota desactivada");
                dirigir("/Mascota/Consultar")
            }

        }
        catch (e) {
            console.error("error al cargar las mascotas" + e)
        }
    }

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

                                    <tr key={mascota.idDto}>
                                        <td>{mascota.nombreMascotaDto}</td>
                                        <td>{mascota.tipoMascotaDto.nombreTipoMascotaDto}</td>
                                        <td>{mascota.fechaNacimientoMascotaDto}</td>
                                        <td>{mascota.razaMascotaDto}</td>
                                        <td>{mascota.pesoMascotaDto}</td>
                                        <td>{mascota.antecedentesMascotaDto || "No tiene antecedentes médicos"}</td>
                                        <td>
                                            <Link to={`/Mascota/Actualizar/${mascota.idDto}`}>
                                                <i className="bi bi-pencil-square"></i>
                                            </Link>
                                            <Link to="#" onClick={() => desactivarMascota(mascota.idDto)} >
                                                <i className="bi bi-trash"></i>
                                            </Link>
                                        </td>
                                        <td>
                                            <Button onClick={()=>{ ReporteMascota(mascota.idDto)}} >
                                                <i class="bi bi-filetype-pdf"></i>
                                            </Button>
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
