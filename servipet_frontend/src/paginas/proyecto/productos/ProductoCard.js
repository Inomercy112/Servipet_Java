import React from "react";
import { Link } from "react-router-dom";
const ProductoCard = ({productos}) => {
    return (

        <section className="bg-light text-white py-5">
            <div className="container">
                <div className="row">
                    {productos.map((producto) => (
                        <div key={producto.id} className="col-md-3">
                            <div className="card text-center text-black bg-secondary mb-3">
                                <img src={`data:image/jpeg;base64,${producto.imagenProducto}`} className="card-img-top" alt={producto.nombreProducto} />
                                <div className="card-body">
                                    <h5 className="card-title">{producto.nombreProducto}</h5>
                                    <p className="card-text">{producto.precioProducto} $</p>
                                    <Link to={`/producto/detalles/${producto.id}`} className="btn btn-dark">Comprar</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
    }
export default ProductoCard;