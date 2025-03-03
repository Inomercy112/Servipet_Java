import React from "react";
import { useNavigate } from "react-router-dom";
import { useCitaContext } from "./../../../context/CitaContext"; // Importa el hook de contexto

const CitaCard = ({ veterinarias }) => {
  const navigate = useNavigate();  // Hook para redirigir
  const { setCitaDetails } = useCitaContext();  // Usar el contexto para actualizar la cita

  const formatTime = (timeString) => {
    if (!timeString) return "";

    let date;
    if (timeString.includes("T")) {
      date = new Date(timeString);
    } else {
      const today = new Date().toISOString().split("T")[0];
      date = new Date(`${today}T${timeString}`);
    }

    return date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
  };

  // Manejar el clic en el botón "Agendar cita"
  const handleAgendarCita = (veterinaria) => {
    // Actualizar el contexto con los detalles de la veterinaria seleccionada
    setCitaDetails(veterinaria.nombreUsuarioDto, veterinaria.horarioAtencionDto);

    // Redirigir al usuario a la página de agendar cita
    navigate(`/Cita/Registrar/${veterinaria.idDto}`);
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
                    className="card-img-top "
                    alt={veterinaria.nombreUsuarioDto}
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{veterinaria.nombreUsuarioDto}</h5 >
                  
                  <h6 className="card-text product-price">{veterinaria.direccionUsuarioDto}</h6>

                  {/* Mostrar los horarios de manera compacta */}
                  <div className="horarios-list">
                    {veterinaria.horarioAtencionDto
                      .filter((horario) => !horario.cerrado)  // Filtrar los días abiertos
                      .map((horario, index) => (
                        <div key={index}>
                          {horario.aperturaDto && horario.cierreDto && (
                            <p>
                              {horario.diaDto}: {formatTime(horario.aperturaDto)} - {formatTime(horario.cierreDto)}
                            </p>
                          )}
                        </div>
                      ))}
                  </div>

                  <button
                    onClick={() => handleAgendarCita(veterinaria)}
                    className="btn btn-info"
                  >
                    Agendar cita
                  </button>
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


