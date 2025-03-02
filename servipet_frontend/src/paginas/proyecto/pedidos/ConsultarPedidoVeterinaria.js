import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import PlantillaTres from "../../../componentes/PlantillaTres";
import { DatosPedidoVeterinaria } from "../../../consultas/DatosPedidoVeterinaria";
import { useAuth } from "../../../context/AuthContext";

const ConsultarPedidoVeterinaria = () => {
    const { token } = useAuth();
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        const cargarPedidos = async () => {
            try {
                const data = await DatosPedidoVeterinaria(localStorage["id"],token);
                setPedidos(data);
            } catch (error) {
                console.error("Error al cargar los pedidos", error);
            }
        };
        cargarPedidos();
    }, [token]);

    return (
        <PlantillaTres title="Consultar Pedidos">
            <div className="container">
                <h2>Lista de Pedidos</h2>
                {pedidos.length === 0 ? ( // Verificar si no hay pedidos
                    <div className="alert alert-warning text-center">
                        No hay pedidos registrados.
                    </div>
                ) : (
                    <>
                        <table id="pedidosTable" className="table">
                            <thead>
                                <tr>
                                    <th>Dirección</th>
                                    <th>Hora de Compra</th>
                                    <th>Día de Compra</th>
                                    <th>Comprador</th>
                                    <th>Método de Entrega</th>
                                    <th>Estado de Entrega</th>
                                    <th>Productos</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pedidos.map((pedido) => (
                                    <tr key={pedido.direccionDto}>
                                        <td>{pedido.direccionDto}</td>
                                        <td>{pedido.horaCompraDto}</td>
                                        <td>{new Date(pedido.diaCompraDto).toLocaleDateString()}</td>
                                        <td>{pedido.quienCompraDto}</td>
                                        <td>{pedido.metodoEntregaDto?.nombreMetodoDto}</td>
                                        <td>{pedido.estadoEntregaDto?.nombreEstadoDto}</td>
                                        <td>
                                            {pedido.productosDto?.length > 0 ? (
                                                <ul>
                                                    {pedido.productosDto.map((producto, index) => (
                                                        <li key={index}>
                                                            <strong>ID:</strong> {producto.idDto}, {" "}
                                                            <strong>Cantidad:</strong> {producto.cantidadProductoDto}, {" "}
                                                            <strong>Precio:</strong> ${producto.precioActualDto}, {" "}
                                                            <strong>Vendedor:</strong> {producto.quienVendeDto}
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <span>No hay productos</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
                <Link to="/Pedido/Registrar">
                    <Button className="btn btn-dark">Registrar Nuevo Pedido</Button>
                </Link>
            </div>
        </PlantillaTres>
    );
};

export default ConsultarPedidoVeterinaria;