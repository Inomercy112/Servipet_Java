import { Link } from "react-router-dom";
import { useCarrito } from "../../../CarritoContext";
import PlantillaUno from "../../../componentes/PlantillaUno";

const CarritoPedido = () => {
    const { carrito, eliminarDelcarrito } = useCarrito();
    const total = carrito.reduce((sum, producto) => sum + producto.precioProductoDto, 0);

    return (
        <PlantillaUno>
            <div className="container">
                <h2>Carrito de compras</h2>
                <div className="carrito-contenedor">
                    <div className="productos-seccion">
                        {carrito.map((producto) => (
                            <div className="producto-recuadro" key={producto.idDto}>

                                <div className="producto-info">
                                    <div className="producto-imagen">
                                        <img src={`data:image/jpeg;base64,${producto.imagenProductoDto}`} alt={producto.nombreProductoDto} />
                                    </div>
                                    <div className="producto-detalles">
                                        <h4>{producto.nombreProductoDto}</h4>
                                        <p>Color: {producto.color} Talla: {producto.talla}</p>
                                        <div className="producto-acciones">
                                            <button className="btn btn-danger btn-sm" onClick={() => eliminarDelcarrito(producto.idDto)}>Eliminar</button>
                                            <button className="btn btn-primary btn-sm"> Guardar </button>
                                            <button className="btn btn-primary btn-sm"> Comprar ahora </button>
                                        </div>
                                        <div className="producto-cantidad">
                                            <button className="cantidad-boton">-</button>
                                            <span>1</span>
                                            <button className="cantidad-boton">+</button>
                                            <p className="producto-precio">$ {producto.precioProductoDto}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="resumen-compra">
                        <h4>Resumen de compra</h4>
                        {carrito.map((producto) => (
                            <p key={producto.idDto}>{producto.nombreProductoDto}</p>
                        ))}
                        <p className="resumen-total">Total: <span>${total}</span></p>
                        <Link to="/Pedido/Registro">
                            <button type="submit" className="btn btn-dark">Continuar compra</button>
                        </Link>
                    </div>

                </div>
            </div>
        </PlantillaUno>
    );
};

export default CarritoPedido;
