import React from "react";
import { Link } from "react-router-dom";

const CitaCard = ({ veterinarias }) => {
  const formatTime = (timeString) => {
    if (!timeString) return "";  
  
    let date;
    if (timeString.includes("T")) {
      // Si la fecha está en formato ISO con fecha y hora (ej. "2025-02-24T05:10:00.000+00:00")
      date = new Date(timeString);
    } else {
      // Si solo es una hora (ej. "05:10:00"), agregamos una fecha base para evitar errores
      const today = new Date().toISOString().split("T")[0]; // Obtiene la fecha de hoy en formato "YYYY-MM-DD"
      date = new Date(`${today}T${timeString}`);
    }
  
    return date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
  };
  
  
  return (
    <section className="bg-light py-5">
      <div className="container">
        <div className="row">
          {veterinarias.map((veterinaria) => (
            <div key={veterinaria.idDto} className="col-md-3">
              <div className="card product-card text-center mb-4">
                <div className="card-img-wrapper">
                  <img
                    src={`data:image/png;base64,${veterinaria.imagenUsuarioDto}`}
                    className="card-img-top"
                    alt={veterinaria.nombreUsuarioDto}
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{veterinaria.nombreUsuarioDto}</h5>
                  <p className="card-text product-price">{veterinaria.direccionUsuarioDto}</p>
                  {veterinaria.horarioAtencionDto
  .filter((horario) => !horario.cerrado) // Filtra los días abiertos
  .map((horario, index) => (
    <div key={index}>
      {horario.aperturaDto && horario.cierreDto && (
        <p>
          {horario.diaDto}: {formatTime(horario.aperturaDto)} - {formatTime(horario.cierreDto)}
        </p>
      )}
    </div>
  ))}


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

