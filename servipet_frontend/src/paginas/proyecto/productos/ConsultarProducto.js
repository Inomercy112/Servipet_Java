import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Image, Modal, Space, Table, Tag, message } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PlantillaTres from "../../../componentes/PlantillaTres";
import { DatosProductos } from "../../../consultas/DatosProductos";
import { useAuth } from "../../../context/AuthContext";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const ConsultarProducto = () => {
    const { token } = useAuth();
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarProductos = async () => {
            try {
                const data = await DatosProductos(token);
                setProductos(Array.isArray(data) ? data : [data]);
            } catch (error) {
                console.error("Error al cargar los productos", error);
            } finally {
                setLoading(false);
            }
        };
        cargarProductos();
    }, [token]);

    const confirmarCancelacion = (id) => {
        Modal.confirm({
            title: "¿Estás seguro?",
            content: "Esta acción desactivará el producto.",
            okText: "Sí, desactivar",
            cancelText: "Cancelar",
            onOk: async () => {
                try {
                    const response = await fetch(`${backendUrl}/producto/Desactivar/${id}`, {
                        method: "PUT",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    });

                    if (response.ok) {
                        message.success("Producto desactivado exitosamente");
                        setProductos((prev) => prev.filter((producto) => producto.idDto !== id));
                    } else {
                        message.error("Error al desactivar el producto");
                    }
                } catch (error) {
                    message.error("Error al desactivar el producto");
                }
            },
        });
    };

    const columns = [
        {
            title: "Nombre",
            dataIndex: "nombreProductoDto",
            key: "nombre",
            sorter: (a, b) => a.nombreProductoDto.localeCompare(b.nombreProductoDto),
        },
        {
            title: "Descripción",
            dataIndex: "descripcionProductoDto",
            key: "descripcion",
            ellipsis: true,
        },
        {
            title: "Precio",
            dataIndex: "precioProductoDto",
            key: "precio",
            render: (precio) => `$ ${precio}`,
            sorter: (a, b) => a.precioProductoDto - b.precioProductoDto,
        },
        {
            title: "Cantidad",
            dataIndex: "cantidadProductoDto",
            key: "cantidad",
            sorter: (a, b) => a.cantidadProductoDto - b.cantidadProductoDto,
        },
        {
            title: "Imagen",
            dataIndex: "imagenProductoDto",
            key: "imagen",
            render: (imagen, record) => (
                <Image
                    width={80}
                    height={80}
                    src={`data:image/jpeg;base64,${imagen}`}
                    alt={record.nombreProductoDto}
                    style={{ objectFit: "cover", borderRadius: "5px", border: "1px solid #ddd" }}
                />
            ),
        },
        {
            title: "Categoría",
            dataIndex: "categoriasNombresDto",
            key: "categoria",
            render: (categorias) =>
                categorias.length > 0 ? (
                    categorias.map((categoria, index) => (
                        <Tag color="blue" key={index}>
                            {categoria}
                        </Tag>
                    ))
                ) : (
                    <Tag color="gray">Sin categoría</Tag>
                ),
        },
        {
            title: "Acciones",
            key: "acciones",
            render: (_, record) => (
                <Space>
                    <Link to={`/Producto/Actualizar/${record.idDto}`}>
                        <Button type="primary" icon={<EditOutlined />} />
                    </Link>
                    <Button type="danger" icon={<DeleteOutlined />} onClick={() => confirmarCancelacion(record.idDto)} />
                </Space>
            ),
        },
    ];

    return (
        <PlantillaTres title="Consultar Productos">
            <div className="container mt-3">
                <h2 className="text-center">Lista de Productos</h2>

                <div className="text-end mb-3">
                    <Link to="/Producto/Registrar">
                        <Button type="primary" icon={<PlusOutlined />}>
                            Registrar Nuevo Producto
                        </Button>
                    </Link>
                </div>

                <Table
                    columns={columns}
                    dataSource={productos}
                    rowKey="idDto"
                    bordered
                    loading={loading}
                    pagination={{ pageSize: 5 }}
                />
            </div>
        </PlantillaTres>
    );
};

export default ConsultarProducto;
