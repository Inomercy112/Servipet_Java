import React from "react";
import { Link } from "react-router-dom";

const ProductoCard = ({ productos }) => {
  return (
    <section className="bg-light py-5">
      <div className="container">
        <div className="row">
          {productos.map((producto) => (
            <div key={producto.idDto} className="col-md-3">
              <div className="card product-card text-center mb-4">
                <div className="card-img-wrapper">
                  <img
                    src={`data:image/jpeg;base64,${producto.imagenProductoDto}`}
                    className="card-img-top"
                    alt={producto.nombreProductoDto}
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{producto.nombreProductoDto}</h5>
                  <p className="card-text product-price">
                    {producto.precioProductoDto} $
                  </p>
                  <Link
                    to={`/producto/detalles/${producto.idDto}`}
                    className="btn btn-dark"
                  >
                    Comprar
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductoCard;
