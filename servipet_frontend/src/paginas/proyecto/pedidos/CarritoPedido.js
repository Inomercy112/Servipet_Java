import { Link } from "react-router-dom";
import { useCarrito } from "../../../CarritoContext";
import PlantillaUno from "../../../componentes/PlantillaUno";
const CarritoPedido = () => {
    const { carrito, eliminarDelcarrito } = useCarrito();


    return (
        <PlantillaUno>

            <div className="container">
                <h2>Carrito de compras</h2>
                {carrito.length > 0 ? (
                    <section>
                        <table id="productosTable" className="table">
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Nombre</th>
                                    <th>cantidad</th>
                                    <th>Valor</th>
                                    <th>Acciones</th>

                                </tr>
                            </thead>
                            <tbody>
                                {carrito.map((producto) => (
                                    <tr key={producto.id}>
                                        <td><img src={`data:image/jpeg;base64,${producto.imagenProducto}`} alt="ola" /></td>
                                        <td>{producto.nombreProducto}</td>
                                        <td>1</td>
                                        <td>$ {producto.precioProducto}</td>

                                        <td>
                                            <Link onClick={() => eliminarDelcarrito(producto.id)} >
                                                <i className="bi bi-trash"></i>
                                            </Link>
                                        </td>
                                    </tr>

                                ))}


                            </tbody>
                        </table>

                        <Link to="/Pedido/Registro">
                            <button type="submit" className="btn btn-dark"> Ir a pagar</button>
                        </Link>
                    </section>
                ) : (
                    <p>Carrito vacio</p>
                )}


            </div>
        </PlantillaUno>

    );
}
export default CarritoPedido;
