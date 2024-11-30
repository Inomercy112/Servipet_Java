import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PlantillaTres from "../../componentes/PlantillaTres";
import { DatosMascotaEsp } from "../../consultas/DatosEspecificosMascota";
import { DatosTipo } from "../../consultas/DatosTipo";
import { useAuth } from "../../context/AuthContext";

function ActualizarMascota() {
  const { token } = useAuth();
  const { id } = useParams();
  const navegar = useNavigate();

  const [tipo, setTipo] = useState([]);
  const [formData, setMascota] = useState({
    idDto: id,
    nombreMascotaDto: "",
    tipoMascotaDto: { idDto: "" },
    tamanoMascotaDto: { idDto: "" },
    fechaNacimientoMascotaDto: "",
    razaMascotaDto: "",
    pesoMascotaDto: "",
    antecedentesMascotaDto: "",
  });

  useEffect(() => {
    const cargarMascota = async () => {
      try {
        const data = await DatosMascotaEsp(token, id);
        setMascota(
          data || {
            nombreMascotaDto: "",
            tipoMascotaDto: { idDto: "" },
            tamanoMascotaDto: { idDto: "" },
            fechaNacimientoMascotaDto: "",
            razaMascotaDto: "",
            pesoMascotaDto: "",
            antecedentesMascotaDto: "",
          }
        );
      } catch (error) {
        console.error("Error al cargar las mascotas ", error);
      }
    };

    const cargarTipos = async () => {
      try {
        const data = await DatosTipo(token);
        setTipo(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error("Error al cargar los tipos", error);
      }
    };

    cargarMascota();
    cargarTipos();
  }, [token, id]);
  
  const handleCharge = (e) => {
    const { name, value } = e.target;

    if (name === "tipoMascotaDto") {
      setMascota((prevState) => ({
        ...prevState,
        tipoMascotaDto: { idDto: value },
      }));
    } else if (name === "tamanoMascotaDto") {
      setMascota((prevState) => ({
        ...prevState,
        tamanoMascotaDto: { idDto: value },
      }));
    } else {
      setMascota((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/mascota/Actualizar/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Datos actualizados de la mascota");
        navegar("/mascota/consultar");
      }
    } catch (error) {
      console.error("Error al actualizar la mascota", error);
    }
  };

  return (
    <PlantillaTres>
      <div className="container">
        <h2>Formulario de Mascota</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre:
            </label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              value={formData.nombreMascotaDto}
              onChange={handleCharge}
              name="nombreMascotaDto"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="tipo" className="form-label">
              Tipo:
            </label>
            <select
              className="form-select"
              id="tipo"
              name="tipoMascotaDto"
              value={formData.tipoMascotaDto.idDto}
              onChange={handleCharge}
              required
            >
              <option value="">Selecciona el tipo de mascota</option>
              {tipo.map((tipos) => (
                <option key={tipos.id} value={tipos.id}>
                  {tipos.nombreTipo}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="tamaño" className="form-label">
              Tamaño:
            </label>
            <select
              className="form-select"
              id="tamaño"
              name="tamanoMascotaDto"
              value={formData.tamanoMascotaDto.idDto}
              onChange={handleCharge}
              required
            >
              <option value="">Selecciona el tamaño de tu mascota</option>
              <option value="1">Grande</option>
              <option value="2">Mediano</option>
              <option value="3">Pequeño</option>
            </select>
          </div>

          <div className="col">
            <label htmlFor="fechaNacimientoMascota" className="form-label">
              Fecha de nacimiento
            </label>
            <input
              type="date"
              className="form-control"
              id="fechaNacimientoMascota"
              name="fechaNacimientoMascotaDto"
              value={formData.fechaNacimientoMascotaDto}
              onChange={handleCharge}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="raza" className="form-label">
              Raza:
            </label>
            <input
              type="text"
              className="form-control"
              id="raza"
              name="razaMascotaDto"
              value={formData.razaMascotaDto}
              onChange={handleCharge}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="pesoKg" className="form-label">
              Peso:
            </label>
            <input
              type="text"
              className="form-control"
              id="pesoKg"
              name="pesoMascotaDto"
              value={formData.pesoMascotaDto}
              onChange={handleCharge}
              required
            />
          </div>

          <div className="col">
            <label htmlFor="antecedentes" className="form-label">
              Antecedentes
            </label>
            <textarea
              className="form-control"
              id="antecedentes"
              name="antecedentesMascotaDto"
              value={formData.antecedentesMascotaDto}
              onChange={handleCharge}
              rows="3"
            ></textarea>
          </div>

          <button type="submit" className="btn btn-dark">
            Modificar
          </button>
        </form>
      </div>
    </PlantillaTres>
  );
}

export default ActualizarMascota;
