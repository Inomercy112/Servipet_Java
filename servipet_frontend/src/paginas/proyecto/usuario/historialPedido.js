import React, { useEffect, useState } from "react";
import PlantillaUno from "../../../componentes/PlantillaUno";
import { useAuth } from "../../../context/AuthContext";

const HistorialPedidos = () => {
    const { token } = useAuth();
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchHistorialPedidos = async () => {
        try {
            const response = await fetch(`http://localhost:8080/pedido/Historial/Usuario/${localStorage["id"]}`, // Reemplaza con la ruta correcta
                {
                    method:"GET",
                    headers: {
                        "Content-type" : "applcation/json",
                        "Authorization": `Bearer ${token}`,
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
    };

    useEffect(() => {
        fetchHistorialPedidos();
    }, []);

    if (loading) return <p>Cargando historial de pedidos...</p>;

    return (
        <PlantillaUno>


        <div className="container mt-5">
            <h2>Historial de Pedidos</h2>
            {pedidos.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Dirección</th>
                            <th>Total Productos</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.map((pedido) => (
                            <tr key={pedido.idDto}>
                                <td>{new Date(pedido.diaCompraDto).toLocaleDateString()}</td>
                                <td>{pedido.horaCompraDto}</td>
                                <td>{pedido.direccionDto}</td>
                                <td>{pedido.productosDto.length}</td>
                                <td>{pedido.estadoEntregaDto.nombreEstadoDto}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay pedidos registrados.</p>
            )}
        </div>
        </PlantillaUno>
    );
};
export default HistorialPedidos;