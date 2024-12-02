import React from "react";
import { Link } from "react-router-dom";

const mascotaCard = ({ mascota }) => {
  return (
    <section className="bg-light py-5">
      <div className="container">
        <div className="row">
          {productos.map((mascota) => (
            <div key={cita.idDto} className="col-md-3">
              <div className="card product-card text-center mb-4">
                <div className="card-img-wrapper">
                  <img
                    src={`data:image/jpeg;base64,${usuario.imagenUsuarioDto}`}
                    className="card-img-top"
                    alt={usuario.imagenUsuarioDto}
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{usuario.nombreUsuarioVetDto}</h5>
                  <p className="card-text product-price">
                    {usuario.nombreUsuarioVetDto} 
                  </p>
                  <p className="card-text product-price">
                    {usuario.direccionUsuarioDto} 
                  </p>
                  <p className="card-text product-price">
                    {usuario.horarioAtencionDto} 
                  </p>
                  <Link
                    to={`/Usuario/${usuario.idDto}`}
                    className="btn btn-info"
                  >
                    Mirar
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

export default CitaCard;
