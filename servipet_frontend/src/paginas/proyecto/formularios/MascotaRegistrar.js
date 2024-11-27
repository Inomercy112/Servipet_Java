import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../../AuthContext';
import PlantillaTres from "../../../componentes/PlantillaTres";
import { DatosTipo } from '../../../consultas/DatosTipo';

const MascotaRegistrar = () => {

  const { token } = useAuth();
  const dirigir = useNavigate();
  const [tipo, setTipo] = useState([]);
  const [formData, setFormData] = useState({
  nombreMascota: "",
    fechaNacimientoMascota: "",
    dueno: { id: localStorage["id"] },
    antecedentes: "",
    tipo: { id: "" }, 
    raza: "",
    pesoKg: "",
    tamaño: { id: "" }, 
    estado: { id: 1 },  
  });
  const [errors, setErrors] = useState({}); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "tipo" || name === "tamaño") {
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

    const newErrors = {};
    if (!formData.nombreMascota) newErrors.nombreMascota = "Nombre de mascota es obligatorio.";
    if (!formData.tipo) newErrors.tipo = "El tipo de mascota es obligatorio.";
    if (!formData.fechaNacimientoMascota) newErrors.fechaNacimientoMascota = "La Fecha de nacimiento es obligatoria.";
    if (!formData.raza) newErrors.raza = "La raza es obligatoria.";
    if (!formData.pesoKg) newErrors.pesoKg = "El peso es obligatorio.";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch("http://localhost:8080/mascota/Registrar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          alert("Mascota registrada!");
          dirigir("/Mascota/Consultar");
        }
      } catch (error) {
        console.error("Error al enviar el formulario:", error);
        alert("Ocurrió un error inesperado", error);
      }
    }
  };

  useEffect(() => {
    const cargarTipos = async () => {
      try {
        const data = await DatosTipo(token);
        setTipo(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error("Error al cargar los tipos", error);
      }
    };
    cargarTipos();
  }, [token]);

  return (
    <PlantillaTres title="Registro Mascota">
      <div className="container mt-5">
      <div className="card shadow p-4">
        <h1>Registro de Mascota</h1>
        <form onSubmit={handleSubmit} id="registroMascota">
          <div className="mb-3">
            <label htmlFor="nombreMascota" className="form-label">Nombre de la Mascota</label>
            <input
              type="text"
              className="form-control"
              id="nombreMascota"
              name="nombreMascota"
              value={formData.nombreMascota}
              onChange={handleChange}
              required
            />
            {errors.nombreMascota && <span className="text-danger">{errors.nombreMascota}</span>}
          </div>
          <div className="mb-3">
          <label htmlFor="tipo" className="form-label">Tipo de Mascota</label>
          <select
            className="form-select"
            id="tipo"
            name="tipo"
            value={formData.tipo.id}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona el tipo de mascota</option>
            {tipo.map(tipos => (
              <option key={tipos.id} value={tipos.id}>{tipos.nombreTipo}</option>
            ))}
          </select>
          {errors.tipo && <span className="text-danger">{errors.tipo}</span>}
        </div>

        <div className="mb-3">
          <label htmlFor="tamaño" className="form-label">Tamaño de mascota</label>
          <select
            className="form-select"
            id="tamaño"
            name="tamaño"
            value={formData.tamaño.id}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona el tamaño de tu mascota</option>
            <option value="1">Grande</option>
            <option value="2">Mediano</option>
            <option value="3">Pequeño</option>
          </select>
          {errors.tamaño && <span className="text-danger">{errors.tamaño}</span>}
        </div>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="fechaNacimientoMascota" className="form-label">Fecha de nacimiento</label>
              <input
                type="date"
                className="form-control"
                id="fechaNacimientoMascota"
                name="fechaNacimientoMascota"
                value={formData.fechaNacimientoMascota}
                onChange={handleChange}
                required
              />
              {errors.fechaNacimientoMascota && <span className="text-danger">{errors.fechaNacimientoMascota}</span>}
            </div>
            <div className="col">
              <label htmlFor="raza" className="form-label">Raza</label>
              <input
                type="text"
                className="form-control"
                id="raza"
                name="raza"
                value={formData.raza}
                onChange={handleChange}
              />
              {errors.raza && <span className="text-danger">{errors.raza}</span>}
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="pesoKg" className="form-label">Peso (kg)</label>
              <input
                type="number"
                className="form-control"
                id="pesoKg"
                name="pesoKg"
                value={formData.pesoKg}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
              {errors.pesoKg && <span className="text-danger">{errors.pesoKg}</span>}
            </div>
            <div className="col">
              <label htmlFor="antecedentes" className="form-label">Antecedentes</label>
              <textarea
                className="form-control"
                id="antecedentes"
                name="antecedentes"
                value={formData.antecedentes}
                onChange={handleChange}
                rows="3"
              ></textarea>
            </div>
          </div>
          <button type="submit" className="btn btn-dark">Registrar Mascota</button>
        </form>
        </div>
      </div>
    </PlantillaTres>
  );
};

export default MascotaRegistrar;
