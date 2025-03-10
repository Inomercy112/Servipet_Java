import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Avatar, Button, Card, Spin, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PlantillaUno from "../../../componentes/PlantillaUno";
import { DatosUsuario } from "../../../consultas/DatosPersonales";
import { useAuth } from "../../../context/AuthContext";

function DetallesPerfil() {
    const { token } = useAuth();
    const [usuario, setUsuario] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const cargarUsuarios = async () => {
            try {
                const data = await DatosUsuario(token);
                setUsuario(Array.isArray(data) ? data : [data]);
            } catch (error) {
                console.error("Error al cargar los datos de usuario", error);
                setError("Error al cargar los datos de usuario");
            }
        };

        cargarUsuarios();
    }, [token]);

    const columns = [
        { title: "Nombre", dataIndex: "nombreUsuarioDto", key: "nombre" },
        { title: "Documento", dataIndex: "documentoUsuarioDto", key: "documento", render: (text) => text || "No tiene documento" },
        { title: "Fecha de Nacimiento", dataIndex: "fechaNacimientoDto", key: "fecha", render: (text) => text || "No registrada" },
        { title: "Dirección", dataIndex: "direccionUsuarioDto", key: "direccion", render: (text) => text || "No registrada" },
        { title: "Teléfono", dataIndex: "telefonoUsuarioDto", key: "telefono", render: (text) => text || "No registrado" },
        {
            title: "Acciones",
            key: "acciones",
            render: (_, record) => (
                <Link to="/Usuario/Actualizar">
                    <Button type="primary" icon={<EditOutlined />} size="small">
                        Editar
                    </Button>
                </Link>
            ),
        },
    ];

    return (
        <PlantillaUno>
            <main className="container">
                <h2>Datos de Perfil</h2>
                {error && <Alert message={error} type="error" showIcon />}
                {!usuario ? (
                    <div style={{ textAlign: "center", padding: "20px" }}>
                        <Spin size="large" />
                    </div>
                ) : (
                    usuario.map((u) => {
                        const tieneImagen = u.imagenUsuarioDto && u.imagenUsuarioDto.length > 100;
                        return (
                            <Card
                                key={u.idDto}
                                style={{ marginBottom: 20, borderRadius: 10 }}
                                title={
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <Avatar
                                            size={64}
                                            src={tieneImagen ? `data:image/jpeg;base64,${u.imagenUsuarioDto}` : null}
                                            icon={!tieneImagen ? <UserOutlined /> : null}
                                            style={{ marginRight: 15 }}
                                        />
                                        {u.nombreUsuarioDto}
                                    </div>
                                }
                            >
                                <Table
                                    dataSource={[u]}
                                    columns={columns}
                                    pagination={false}
                                    rowKey="idDto"
                                    bordered
                                />
                            </Card>
                        );
                    })
                )}
            </main>
        </PlantillaUno>
    );
}

export default DetallesPerfil;
