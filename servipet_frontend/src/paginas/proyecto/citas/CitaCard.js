import React from "react";
import { Link } from "react-router-dom";

const CitaCard = ({ veterinarias }) => {
  return (
    <section className="bg-light py-5">
      <div className="container">
        <div className="row">
          {veterinarias.map((veterinaria) => (
            <div key={veterinaria.idDto} className="col-md-3">
              <div className="card product-card text-center mb-4">
                <div className="card-img-wrapper">
                  <img
                    src={`data:image/jpeg;base64,${veterinaria.imagenUsuarioDto}`}
                    className="card-img-top"
                    alt={veterinaria.nombreUsuarioDto}
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{veterinaria.nombreUsuarioDto}</h5>
                  <p className="card-text product-price">
                    {veterinaria.nombreUsuarioVetDto} 
                  </p>
                  <p className="card-text product-price">
                    {veterinaria.direccionUsuarioDto} 
                  </p>
                  <div className="card-text product-price">
                    {veterinaria.horarioAtencionDto.map((horario, index) => (
                      !horario.cerrado && (
                        <div key={index}>
                          <p>
                            {horario.diaDto}: {horario.aperturaDto} - {horario.cierreDto}
                          </p>
                        </div>
                      )
                    ))}
                  </div>
                  <Link
                    to={`/Cita/Registrar/${veterinaria.idDto}`}
                    className="btn btn-info"
                  >
                    Agendar cita
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

