import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlantillaTres from "../../../componentes/PlantillaTres";
import { useAuth } from '../../../AuthContext';

const MascotaRegistrar = () => {
  const { token } = useAuth();
  const dirigir = useNavigate();
  const [formData, setFormData] = useState({
    nombreMascota: "",
    tipo: "",
    edad: "",
    raza: "",
    peso: "",
    antecedentes: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.nombreMascota) newErrors.nombreMascota = "Nombre de mascota es obligatorio.";
    if (!formData.tipo) newErrors.tipo = "El tipo de mascota es obligatorio.";
    if (!formData.edad) newErrors.edad = "La Fecha de nacimiento es obligatoria.";
    if (!formData.raza) newErrors.raza = "La raza es obligatoria.";
    if (!formData.peso) newErrors.peso = "El peso es obligatorio.";

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

  return (
    <PlantillaTres title="Registro Mascota">
      <div className="container mt-5">
        <h1>Registro de Mascota</h1>
        <form onSubmit={handleSubmit}>
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
              value={formData.tipo}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona el tipo de mascota</option>
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
              <option value="Ave">Ave</option>
              <option value="Roedor">Roedor</option>
              <option value="Reptil">Reptil</option>
              <option value="Otro">Otro</option>
            </select>
            {errors.tipo && <span className="text-danger">{errors.tipo}</span>}
          </div>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="edad" className="form-label">Fecha de nacimiento</label>
              <input
                type="date"
                className="form-control"
                id="edad"
                name="edad"
                value={formData.edad}
                onChange={handleChange}
                required
              />
              {errors.edad && <span className="text-danger">{errors.edad}</span>}
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
              <label htmlFor="peso" className="form-label">Peso (kg)</label>
              <input
                type="number"
                className="form-control"
                id="peso"
                name="peso"
                value={formData.peso}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
              {errors.peso && <span className="text-danger">{errors.peso}</span>}
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
    </PlantillaTres>
  );
};

export default MascotaRegistrar;
