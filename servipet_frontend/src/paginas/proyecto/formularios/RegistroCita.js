import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PlantillaTres from "../../../componentes/PlantillaTres";
import { DatosMascota } from "../../../consultas/DatosMascota";
import { useAuth } from "../../../context/AuthContext";
const RegistroCita = () => {
  const {id} = useParams();
  const dirigir = useNavigate();
  const { token } = useAuth();
  const today = new Date().toISOString().split("T")[0];
  const [Mascota, setMascota] = useState([]);
  const [formData, setFormData] = useState({
    razonDto: "",
    fechaCitaDto: "",
    mascotaAsisteDto: {
      idDto: "",
    },
    horaCitaDto: "",
    estadoCitaDto: {
      idDto: 2,
    },
    quienAsisteDto: localStorage["id"],
    quienAtiendeDto: id,
    estadoCDto: 1
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mascotaAsisteDto") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: { idDto: value },
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
            <div className="card2 shadow p-4">
              <h2 className="mb-4">Formulario de Citas</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="razon" className="form-label">
                    Descripción:
                  </label>
                  <textarea
                    id="razon"
                    name="razonDto"
                    onChange={handleChange}
                    value={formData.razonDto}
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
                    name="fechaCitaDto"
                    onChange={handleChange}
                    value={formData.fechaCitaDto}
                    min={today}
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
                    name="mascotaAsisteDto"
                    className="form-select"
                    onChange={handleChange}
                    value={formData.mascotaAsisteDto.idDto}
                    required
                  >
                    <option value="" disabled defaultValue>
                      Selecciona tu mascota
                    </option>
                    {Mascota.map((mascotas) => (
                      <option key={mascotas.idDto} value={mascotas.idDto}>
                        {mascotas.nombreMascotaDto}
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
                    name="horaCitaDto"
                    value={formData.horaCitaDto}
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
