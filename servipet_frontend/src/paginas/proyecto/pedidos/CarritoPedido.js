import { Link } from "react-router-dom";
import PlantillaUno from "../../../componentes/PlantillaUno";
import { useCarrito } from "../../../context/CarritoContext";

const CarritoPedido = () => {
    const { carrito, eliminarDelCarrito, actualizarCantidad } = useCarrito();

    const incrementarCantidad = (productoId, cantidadActual) => {
        const producto = carrito.find(p => p.idDto === productoId); 
        if (producto && cantidadActual < producto.cantidadProductoDto) {
            actualizarCantidad(productoId, cantidadActual + 1);
        }
    };

    const decrementarCantidad = (productoId, cantidadActual) => {
        if (cantidadActual > 1) {
            actualizarCantidad(productoId, cantidadActual - 1);
        }
    };

    const total = carrito.reduce(
        (sum, producto) => sum + producto.precioProductoDto * producto.cantidad,
        0
    );

    return (
        <PlantillaUno>
            <div className="container">
                <h2>Carrito de compras</h2>
                
                {carrito.length === 0 ? (
                    <div className="alert alert-warning text-center">
                        Tu carrito está vacío. Agrega productos para continuar con la compra.
                    </div>
                ) : (
                    <div className="carrito-contenedor">
                        <div className="productos-seccion">
                            {carrito.map((producto) => (
                                <div className="producto-recuadro" key={producto.idDto}>
                                    <div className="producto-info">
                                        <div className="producto-imagen">
                                            <img
                                                src={`data:image/jpeg;base64,${producto.imagenProductoDto}`}
                                                alt={producto.nombreProductoDto}
                                            />
                                        </div>
                                        <div className="producto-detalles">
                                            <h4>{producto.nombreProductoDto}</h4>
                                            <p>Cantidad disponible: {producto.cantidadProductoDto}</p>
                                            <div className="producto-acciones">
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => eliminarDelCarrito(producto.idDto)}
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                            <div className="producto-cantidad">
                                                <button
                                                    className="cantidad-boton"
                                                    onClick={() => decrementarCantidad(producto.idDto, producto.cantidad)}
                                                >
                                                    -
                                                </button>
                                                <span>{producto.cantidad}</span>
                                                <button
                                                    className="cantidad-boton"
                                                    onClick={() => incrementarCantidad(producto.idDto, producto.cantidad)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="resumen-compra">
                            <h4>Resumen de compra</h4>
                            {carrito.map((producto) => (
                                <p key={producto.idDto}>{producto.nombreProductoDto} (x{producto.cantidad})</p>
                            ))}
                            <p className="resumen-total">
                                Total: <span>${total.toFixed(2)}</span>
                            </p>
                            <Link to="/Pedido/Opciones">
                                <button type="submit" className="btn btn-dark" disabled={carrito.length === 0}>
                                    Continuar compra
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </PlantillaUno>
    );
};

export default CarritoPedido;
