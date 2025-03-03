import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import PlantillaTres from "../../../componentes/PlantillaTres";
import { DatosProductos } from "../../../consultas/DatosProductos";
import { useAuth } from "../../../context/AuthContext";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const ConsultarProducto = () => {
    const { token } = useAuth();
    const [producto, setProducto] = useState([]);
    const confirmarCancelacion = (id) => {
        const confirmar = window.confirm("¿Estás seguro de que deseas desactivar el producto?");
        if (confirmar) {
            try {
                fetch(`${backendUrl}/producto/Desactivar/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true'
                    },
                }).then(response => {
                    if (response.ok) {
                        alert("Producto desactivado exitosamente");
                        // Actualizar la lista de productos después de desactivar
                        setProducto((prevProductos) =>
                            prevProductos.filter((producto) => producto.idDto !== id)
                        );
                    }
                });
            } catch (error) {
                alert("Error al desactivar el producto", error);
            }
        }
    };

    useEffect(() => {
        const cargarProductos = async () => {
            try {
                const data = await DatosProductos(token);
                console.log(data);
                if (data) {
                    setProducto(Array.isArray(data) ? data : [data]);
                } else {
                    setProducto([]);
                }
            } catch (error) {
                console.error("Error al cargar los productos", error);
            }
        };
        cargarProductos();
    }, [token]);
    return (
        <PlantillaTres title="Consultar Productos">
            <div className="container">
                <h2>Lista de Productos</h2>
                {producto.length === 0 ? ( // Verificar si no hay productos
                    <div className="alert alert-warning text-center">
                        No tienes productos registrados.
                    </div>
                ) : (
                    <>
                        <table id="productosTable" className="table">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Descripción</th>
                                    <th>Precio</th>
                                    <th>Cantidad</th>
                                    <th>Imagen</th>
                                    <th>Categoría</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {producto.map((productos) => (
                                    <tr key={productos.idDto}>
                                        <td>{productos.nombreProductoDto}</td>
                                        <td>{productos.descripcionProductoDto}</td>
                                        <td>$ {productos.precioProductoDto}</td>
                                        <td>{productos.cantidadProductoDto} Unidades</td>
                                        <td>
                                            <img
                                                src={`data:image/jpeg;base64,${productos.imagenProductoDto}`}
                                                alt={productos.nombreProductoDto}
                                                style={{ width: "100px", height: "100px" }}
                                            />
                                        </td>
                                        <td>
                                            {productos.categoriasNombresDto.length > 0 ? (
                                                productos.categoriasNombresDto.map((categoria, index) => (
                                                    <span key={index}>
                                                        - {categoria}
                                                    </span>
                                                ))
                                            ) : (
                                                <span>Sin categorías</span>
                                            )}
                                        </td>
                                        <td>
                                            <Link to={"/Producto/Actualizar/" + productos.idDto}>
                                                <i className="bi bi-pencil-square"></i>
                                            </Link>
                                            <Link to="#" onClick={() => confirmarCancelacion(productos.idDto)}>
                                                <i className="bi bi-trash"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
                <Link to="/Producto/Registrar">
                    <Button className="btn btn-dark">Registrar Nuevo Producto</Button>
                </Link>
            </div>
        </PlantillaTres>
    );
};

export default ConsultarProducto;