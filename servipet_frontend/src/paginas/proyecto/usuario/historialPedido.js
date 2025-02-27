import React, { useEffect, useState, useCallback } from "react";
import PlantillaUno from "../../../componentes/PlantillaUno";
import { useAuth } from "../../../context/AuthContext";

const HistorialPedidos = () => {
    const { token } = useAuth();
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchHistorialPedidos = useCallback(async () => {
        try {
            const response = await fetch(
                `http://localhost:8080/pedido/Historial/Usuario/${localStorage["id"]}`,
                {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.ok) {
                const data = await response.json();
                setPedidos(data);
            } else {
                console.error("Error al obtener historial de pedidos");
            }
        } catch (error) {
            console.error("Error al conectar con el servidor", error);
        } finally {
            setLoading(false);
        }
    }, [token]); 

    useEffect(() => {
        fetchHistorialPedidos();
    }, [fetchHistorialPedidos]); 

    if (loading) return <p>Cargando historial de pedidos...</p>;

    return (
        <PlantillaUno>
            <div className="container mt-5">
                <h2>Historial de Pedidos</h2>
                {pedidos.length > 0 ? (
                    <div className="pedidos-list">
                        {pedidos.map((pedido) => (
                            <div key={pedido.idDto} className="pedido-card">
                                <div className="pedido-header">
                                    <span className="fecha">
                                        {new Date(pedido.diaCompraDto).toLocaleDateString()}
                                    </span>
                                    <span className="hora">{pedido.horaCompraDto}</span>
                                </div>
                                <div className="pedido-body">
                                    <p className="direccion">
                                        <strong>Dirección:</strong> {pedido.direccionDto}
                                    </p>
                                    <p className="total-productos">
                                        <strong>Total Productos:</strong> {pedido.productosDto.length}
                                    </p>
                                    <p className="estado">
                                        <strong>Estado:</strong> {pedido.estadoEntregaDto.nombreEstadoDto}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="alert alert-warning text-center">
                        No tienes pedidos registrados.
                    </div>
                )}
            </div>
        </PlantillaUno>
    );
};

export default HistorialPedidos;