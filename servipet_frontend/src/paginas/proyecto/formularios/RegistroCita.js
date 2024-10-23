import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../AuthContext";
import PlantillaTres from "../../../componentes/PlantillaTres";
import { DatosMascota } from "../../../consultas/DatosMascota";
const RegistroCita = () => {
  const dirigir = useNavigate();
  const { token } = useAuth();
  const [Mascota, setMascota] = useState([]);
  const [formData, setFormData] = useState({
    razon: "",
    fechaCita: "",
    mascotaAsiste: {
      id: "",
    },
    horaCita: "",
    estadoCita: {
      id: 2,
    },
    quienAsiste: {
      id: localStorage["id"],
    },

    quienAtiende: {
      id: 2,
    },

    estado: {
      id: 1,
    },
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mascotaAsiste") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: { id: value },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/cita/Registrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Se registro correctamente la cita");
        dirigir("/Cita/Consultar");
      } else {
        alert("Ocurrio un problema!!!");
      }
    } catch (error) {
      console.error("ocurrio un problema con las citas", error);
    }
  };
  useEffect(() => {
    const CargarMascotas = async () => {
      try {
        const data = await DatosMascota(token);
        setMascota(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error("error al cargar las mascotas");
      }
    };
    CargarMascotas();
  }, [token]);

  return (
    <PlantillaTres title="Registro Cita">
      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow p-4">
              <h2 className="mb-4">Formulario de Citas</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="razon" className="form-label">
                    Descripción:
                  </label>
                  <textarea
                    id="razon"
                    name="razon"
                    onChange={handleChange}
                    value={formData.razon}
                    className="form-control"
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="fechaCita" className="form-label">
                    Fecha de la Cita:
                  </label>
                  <input
                    type="date"
                    id="fechaCita"
                    name="fechaCita"
                    onChange={handleChange}
                    value={formData.fechaCita}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="mascotaAsiste" className="form-label">
                    Que mascota asiste
                  </label>
                  <select
                    id="mascotaAsiste"
                    name="mascotaAsiste"
                    className="form-select"
                    onChange={handleChange}
                    value={formData.mascotaAsiste.id}
                    required
                  >
                    <option value="" disabled defaultValue>
                      Selecciona tu mascota
                    </option>
                    {Mascota.map((mascotas) => (
                      <option key={mascotas.id} value={mascotas.id}>
                        {mascotas.nombreMascota}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="horaCita" className="form-label">
                    Hora de la Cita:
                  </label>
                  <input
                    type="time"
                    id="horaCita"
                    name="horaCita"
                    value={formData.horaCita}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-dark">
                  Programar Cita
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PlantillaTres>
  );
};
export default RegistroCita;
