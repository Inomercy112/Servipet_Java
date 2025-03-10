import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Spin, Table, Tag } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PlantillaUno from "../../../componentes/PlantillaUno";
import { DatosCitas } from "../../../consultas/DatosCitas";
import { useAuth } from "../../../context/AuthContext";

function HistorialCita() {
    const { token } = useAuth();
    const [citas, setCitas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarCitas = async () => {
            try {
                const data = await DatosCitas(token);
                setCitas(Array.isArray(data) ? data : [data]);
            } catch (error) {
                console.error("Error al cargar las citas", error);
            } finally {
                setLoading(false);
            }
        };

        cargarCitas();
    }, [token]);

    // Definir colores para el estado de la cita
    const getEstadoColor = (estado) => {
        switch (estado.toLowerCase()) {
            case "confirmada":
                return "green";
            case "pendiente":
                return "gold";
            case "cancelada":
                return "red";
            default:
                return "blue";
        }
    };

    const columns = [
        { title: "Mascota", dataIndex: "nombreMascota", key: "nombreMascota" },
        { 
            title: "Fecha", 
            dataIndex: "fechaCita", 
            key: "fechaCita",
            render: (text) => dayjs(text).format("DD/MM/YYYY"),
        },
        { 
            title: "Hora", 
            dataIndex: "horaCita", 
            key: "horaCita",
            render: (text) => dayjs(text, "HH:mm:ss").format("hh:mm A"),
        },
        {
            title: "Estado",
            dataIndex: "estadoCita",
            key: "estadoCita",
            render: (estado) => <Tag color={getEstadoColor(estado)}>{estado}</Tag>,
        },
        { title: "Razón", dataIndex: "razon", key: "razon" },
        { 
            title: "Diagnóstico", 
            dataIndex: "diagnostico", 
            key: "diagnostico",
            render: (text) => text || "Por evaluar",
        },
    ];

    // Transformar datos para Ant Design Table
    const dataSource = citas.map((cita) => ({
        key: cita.idDto,
        nombreMascota: cita.mascotaAsisteDto.nombreMascotaDto,
        fechaCita: cita.fechaCitaDto,
        horaCita: cita.horaCitaDto,
        estadoCita: cita.estadoCitaDto.nombreEstadoCitaDto,
        razon: cita.razonDto,
        diagnostico: cita.diagnosticoDto,
    }));

    return (
        <PlantillaUno>
            <main className="container">
                <h2>Historial de Citas</h2>
                <Card>
                    {loading ? (
                        <div style={{ textAlign: "center", padding: "20px" }}>
                            <Spin size="large" />
                        </div>
                    ) : (
                        <Table
                            columns={columns}
                            dataSource={dataSource}
                            pagination={{ pageSize: 5 }}
                            bordered
                        />
                    )}
                    <div style={{ marginTop: 20, textAlign: "right" }}>
                        <Link to="/Cita/Consultar-veterinaria">
                            <Button type="primary" icon={<PlusOutlined />}>
                                Programar nueva cita
                            </Button>
                        </Link>
                    </div>
                </Card>
            </main>
        </PlantillaUno>
    );
}

export default HistorialCita;
