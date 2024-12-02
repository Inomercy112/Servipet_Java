import React, { useEffect, useState } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
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
            if (!response.ok) {
                alert("Error con el PDF");
                return;
            }
            const pdfBlob = await response.blob();
            const url = window.URL.createObjectURL(pdfBlob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `Reporte_Citas_Mascota_${id}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (e) {
            console.error("Error", e);
        }
    };

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
                alert("Mascota desactivada");
                dirigir("/Mascota/Consultar");
            }
        } catch (e) {
            console.error("Error al desactivar la mascota", e);
        }
    };

    return (
        <PlantillaTres>
            <main>
                <div className="container">
                    <h2>Tus Mascotas</h2>
                    <Row>
                        {mascotas.length > 0 ? (
                            mascotas.map((mascota) => (
                                <Col md={4} key={mascota.idDto}>
                                    <Card className="mb-4">
                                        {/* Imagen de la mascota */}
                                        <Card.Img 
                                            variant="top" 
                                            src={`/img/mascotas/${mascota.tipoMascotaDto.nombreMascotaDto}.jpg`} 
                                            onError={(e) => e.target.src = "/img/default.png"} // Imagen predeterminada si no existe
                                            alt={`Imagen de ${mascota.nombreMascotaDto}`} 
                                        />
                                        <Card.Body>
                                            <Card.Title>{mascota.nombreMascotaDto}</Card.Title>
                                            <Card.Text>
                                                <strong>Tipo:</strong> {mascota.tipoMascotaDto.nombreTipoMascotaDto}<br />
                                                <strong>Raza:</strong> {mascota.razaMascotaDto}<br />
                                                <strong>Edad:</strong> {mascota.fechaNacimientoMascotaDto}<br />
                                            </Card.Text>
                                            <div className="d-flex justify-content-between">
                                                <Link to={`/Mascota/Actualizar/${mascota.idDto}`} className="btn btn-primary btn-sm">
                                                    <i className="bi bi-pencil-square"></i> 
                                                </Link>
                                                <Button variant="danger" size="sm" onClick={() => desactivarMascota(mascota.idDto)}>
                                                    <i className="bi bi-trash"></i> 
                                                </Button>
                                                <Button variant="info" size="sm" onClick={() => ReporteMascota(mascota.idDto)}>
                                                    <i className="bi bi-filetype-pdf"></i> 
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <p>No tienes mascotas registradas.</p>
                        )}
                    </Row>
                    <Link to="/Mascota/Registrar" className="btn btn-dark mt-3">
                        Agregar nueva mascota
                    </Link>
                </div>
            </main>
        </PlantillaTres>
    );
}

export default ConsultarMascota;
