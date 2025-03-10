import { Input, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import PlantillaTres from "../../../componentes/PlantillaTres";
import { DatosPedidoVeterinaria } from "../../../consultas/DatosPedidoVeterinaria";
import { useAuth } from "../../../context/AuthContext";

const { Search } = Input;

const ConsultarPedidoVeterinaria = () => {
    const { token } = useAuth();
    const [pedidos, setPedidos] = useState([]);
    const [filteredPedidos, setFilteredPedidos] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        const cargarPedidos = async () => {
            try {
                const data = await DatosPedidoVeterinaria(localStorage["id"], token);
                setPedidos(data);
                setFilteredPedidos(data);
            } catch (error) {
                console.error("Error al cargar los pedidos", error);
            }
        };
        cargarPedidos();
    }, [token]);

    // Función para filtrar la tabla en base al texto ingresado
    const handleSearch = (value) => {
        setSearchText(value.toLowerCase());
        const filteredData = pedidos.filter((pedido) =>
            pedido.direccionDto.toLowerCase().includes(value.toLowerCase()) ||
            pedido.nombreUsuarioDto.toLowerCase().includes(value.toLowerCase()) ||
            pedido.estadoEntregaDto?.nombreEstadoDto.toLowerCase().includes(value.toLowerCase()) ||
            pedido.metodoEntregaDto?.nombreMetodoDto.toLowerCase().includes(value.toLowerCase()) ||
            pedido.productosDto.some((producto) =>
                producto.nombreProductoDto.toLowerCase().includes(value.toLowerCase())
            )
        );
        setFilteredPedidos(filteredData);
    };

    // Columnas de la tabla
    const columns = [
        {
            title: "Dirección",
            dataIndex: "direccionDto",
            key: "direccion",
            sorter: (a, b) => a.direccionDto.localeCompare(b.direccionDto),
        },
        {
            title: "Hora de Compra",
            dataIndex: "horaCompraDto",
            key: "horaCompra",
            sorter: (a, b) => a.horaCompraDto.localeCompare(b.horaCompraDto),
        },
        {
            title: "Día de Compra",
            dataIndex: "diaCompraDto",
            key: "diaCompra",
            render: (fecha) => new Date(fecha).toLocaleDateString(),
            sorter: (a, b) => new Date(a.diaCompraDto) - new Date(b.diaCompraDto),
        },
        {
            title: "Comprador",
            dataIndex: "nombreUsuarioDto",
            key: "comprador",
            sorter: (a, b) => a.nombreUsuarioDto.localeCompare(b.nombreUsuarioDto),
        },
        {
            title: "Método de Entrega",
            dataIndex: ["metodoEntregaDto", "nombreMetodoDto"],
            key: "metodoEntrega",
            filters: [
                { text: "Domicilio", value: "Domicilio" },
                { text: "Recoger en tienda", value: "Recoger en tienda" },
            ],
            onFilter: (value, record) => record.metodoEntregaDto?.nombreMetodoDto === value,
        },
        {
            title: "Estado de Entrega",
            dataIndex: ["estadoEntregaDto", "nombreEstadoDto"],
            key: "estadoEntrega",
            render: (estado) => (
                <Tag color={estado === "Entregado" ? "green" : "volcano"}>{estado}</Tag>
            ),
            filters: [
                { text: "Entregado", value: "Entregado" },
                { text: "Pendiente", value: "Pendiente" },
                { text: "En camino", value: "En camino" },
            ],
            onFilter: (value, record) => record.estadoEntregaDto?.nombreEstadoDto === value,
        },
        {
            title: "Productos",
            key: "productos",
            render: (_, record) => (
                <Table
                    dataSource={record.productosDto}
                    columns={[
                        {
                            title: "Nombre",
                            dataIndex: "nombreProductoDto",
                            key: "nombreProducto",
                        },
                        {
                            title: "Cantidad",
                            dataIndex: "cantidadProductoDto",
                            key: "cantidad",
                        },
                        {
                            title: "Precio",
                            dataIndex: "precioActualDto",
                            key: "precio",
                            render: (precio) => `$${precio}`,
                        },
                        {
                            title: "Vendedor",
                            dataIndex: "nombreVendedorDto",
                            key: "vendedor",
                        },
                    ]}
                    pagination={false}
                    size="small"
                    bordered
                />
            ),
        },
    ];

    return (
        <PlantillaTres title="Consultar Pedidos">
            <div className="container mt-3">
                <h2 className="text-center">Lista de Pedidos</h2>
                
                {/* Barra de búsqueda */}
                <Space style={{ marginBottom: 16 }}>
                    <Search
                        placeholder="Buscar por dirección, comprador, estado, método..."
                        allowClear
                        onSearch={handleSearch}
                        onChange={(e) => handleSearch(e.target.value)}
                        style={{ width: 400 }}
                    />
                </Space>

                {filteredPedidos.length === 0 ? (
                    <div className="alert alert-warning text-center">
                        No hay pedidos registrados.
                    </div>
                ) : (
                    <Table
                        dataSource={filteredPedidos}
                        columns={columns}
                        rowKey="idDto"
                        bordered
                        pagination={{ pageSize: 5 }}
                    />
                )}
            </div>
        </PlantillaTres>
    );
};

export default ConsultarPedidoVeterinaria;
