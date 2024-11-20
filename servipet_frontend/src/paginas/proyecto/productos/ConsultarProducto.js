import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../../AuthContext";
import PlantillaTres from "../../../componentes/PlantillaTres";
import { DatosProductos } from "../../../consultas/DatosProductos";
const ConsultarProducto = () => {
const { token } = useAuth();
const [producto, setProducto] = useState([]);


const confirmarCancelacion = (id) => {
    const confirmar = window.confirm("Estas seguro que deseas desactivar el producto ? ");
    if( confirmar){
    try {
        fetch(`http://localhost:8080/producto/Desactivar/${id}`,{
            method: 'PUT',
            headers: {
                'Authorization' : `Bearer ${token}`,
                'Content-Type' : 'application/json',
            },
        }).then(response => {
            if(response.ok){
                alert("producto desactivo exitosamente");
            }
        })
    }catch (error) {
        alert("Error al eliminar los productos", error);
    }
}

}

useEffect(() => {
    const cargarProductos = async () => {
    try {
        const data = await DatosProductos(token);
        setProducto(Array.isArray(data) ? data : [data]);
    } catch (error) {
        console.error("error al cargar los productos", error);
    }
    };
    cargarProductos();
}, [token]);
return (
    <PlantillaTres title="Consultar Productos">
    <div className="container">
        <h2>Lista de Productos</h2>
        <table id="productosTable" className="table">
        <thead>
            <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Imagen</th>
            <th>Categoria</th>
            <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            {producto.map((productos) => (
            <tr key={productos.id}>
                <td>{productos.nombreProductoDto}</td>
                <td>{productos.descripcionProductoDto} </td>
                <td>$ {productos.precioProductoDto}</td>
                <td>{productos.cantidadProductoDto} Unidades</td>
                {/* Mostrar la imagen */}
                <td>
                <img
                    src={`data:image/jpeg;base64,${productos.imagenProductoDto}`}
                    alt={productos.nombreProductoDto}
                    style={{ width: "100px", height: "100px" }}
                />
                </td>
                {/* Mostrar las categorías */}
                <td>
                {productos.categoriasDto.length > 0 ? (
                    productos.categoriasDto.map((categoria) => (
                    <span key={categoria.id}>
                        - {categoria.nombreCategoria}
                    </span>
                    ))
                ) : (
                    <span>Sin categorías</span>
                )}
                </td>
                <td>
                <Link to={"/Producto/Actualizar/"+ productos.id }>
                    <i className="bi bi-pencil-square"></i>
                </Link>
                <Link to="#" onClick={() => confirmarCancelacion(productos.id)}>
                    <i className="bi bi-trash"></i>
                </Link>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
        <Link to="/Producto/Registrar">
        <Button className="btn btn-dark">Registrar Nuevo Producto</Button>
        </Link>
    </div>
    </PlantillaTres>
);
};
export default ConsultarProducto;