import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PlantillaTres from "../../../componentes/PlantillaTres";
import { DatosTipo } from '../../../consultas/DatosTipo';
import { useAuth } from '../../../context/AuthContext';

const MascotaRegistrar = () => {

  const { token } = useAuth();
  const dirigir = useNavigate();
  const [tipo, setTipo] = useState([]);
  const [formData, setFormData] = useState({
    nombreMascotaDto: "",
    fechaNacimientoMascotaDto: "",
    duenoMascotaDto: localStorage["id"] ,
    antecedentesMascotaDto: "",
    tipoMascotaDto: { idDto: "" },
    razaMascotaDto: "",
    pesoMascotaDto: "",
    tamanoMascotaDto: { idDto: "" },
    estadoMascotaDto: 1,
  });
  const [errors, setErrors] = useState({}); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "tipoMascotaDto" || name === "tamanoMascotaDto") {
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

    const newErrors = {};
    if (!formData.nombreMascotaDto) newErrors.nombreMascotaDto = "Nombre de mascota es obligatorio.";
    if (!formData.tipoMascotaDto) newErrors.tipoMascotaDto = "El tipo de mascota es obligatorio.";
    if (!formData.fechaNacimientoMascotaDto) newErrors.fechaNacimientoMascotaDto = "La Fecha de nacimiento es obligatoria.";
    if (!formData.razaMascotaDto) newErrors.razaMascotaDto = "La raza es obligatoria.";
    if (!formData.pesoMascotaDto) newErrors.pesoMascotaDto = "El peso es obligatorio.";
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
      <div className="card2 shadow p-4">
        <h1>Registro de Mascota</h1>
        <form onSubmit={handleSubmit} id="registroMascota">
          <div className="mb-3">
            <label htmlFor="nombreMascota" className="form-label">Nombre de la Mascota</label>
            <input
              type="text"
              className="form-control"
              id="nombreMascota"
              name="nombreMascotaDto"
              value={formData.nombreMascotaDto || ""}
              onChange={handleChange}
              required
            />
            {errors.nombreMascotaDto && <span className="text-danger">{errors.nombreMascotaDto}</span>}
          </div>
          <div className="mb-3">
          <label htmlFor="tipo" className="form-label">Tipo de Mascota</label>
          <select
            className="form-select"
            id="tipo"
            name="tipoMascotaDto"
            value={formData.tipoMascotaDto.idDto}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona el tipo de mascota</option>
            {tipo.map(tipos => (
              <option key={tipos.id} value={tipos.id}>{tipos.nombreTipo}</option>
            ))}
          </select>
          {errors.tipoMascotaDto && <span className="text-danger">{errors.tipoMascotaDto}</span>}
        </div>

        <div className="mb-3">
          <label htmlFor="tamaño" className="form-label">Tamaño de mascota</label>
          <select
            className="form-select"
            id="tamaño"
            name="tamanoMascotaDto"
            value={formData.tamanoMascotaDto.idDto}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona el tamaño de tu mascota</option>
            <option value="1">Grande</option>
            <option value="2">Mediano</option>
            <option value="3">Pequeño</option>
          </select>
          {errors.tamanoMascotaDto && <span className="text-danger">{errors.tamanoMascotaDto}</span>}
        </div>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="fechaNacimientoMascota" className="form-label">Fecha de nacimiento</label>
              <input
                type="date"
                className="form-control"
                id="fechaNacimientoMascota"
                name="fechaNacimientoMascotaDto"
                value={formData.fechaNacimientoMascotaDto}
                onChange={handleChange}
                required
              />
              {errors.fechaNacimientoMascotaDto && <span className="text-danger">{errors.fechaNacimientoMascotaDto}</span>}
            </div>
            <div className="col">
              <label htmlFor="raza" className="form-label">Raza</label>
              <input
                type="text"
                className="form-control"
                id="raza"
                name="razaMascotaDto"
                value={formData.razaMascotaDto}
                onChange={handleChange}
              />
              {errors.razaMascotaDto && <span className="text-danger">{errors.razaMascotaDto}</span>}
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="pesoKg" className="form-label">Peso (kg)</label>
              <input
                type="number"
                className="form-control"
                id="pesoKg"
                name="pesoMascotaDto"
                value={formData.pesoMascotaDto}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
              {errors.pesoMascotaDto && <span className="text-danger">{errors.pesoMascotaDto}</span>}
            </div>
            <div className="col">
              <label htmlFor="antecedentes" className="form-label">Antecedentes</label>
              <textarea
                className="form-control"
                id="antecedentes"
                name="antecedentesMascotaDto"
                value={formData.antecedentesMascotaDto}
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
