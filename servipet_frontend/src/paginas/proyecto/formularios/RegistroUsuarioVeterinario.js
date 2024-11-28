import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlantillaUno from "../../../componentes/PlantillaUno";

const RegistroUsuarioVeterinario = () => {
  const dirigir = useNavigate();

  const [formData, setFormData] = useState({
    nombreVeterinaria: "",
    logo: null,
    nombreUsuarioDto: "",
    correoContacto: "",
    correoUsuarioDto: "",
    contrasenaUsuarioDto: "",
    direccionUsuarioDto: "",
    telefonoUsuarioDto: "",
    horariosAtencion: "",
    diasDisponibles: [], 
    rolUsuarioDto: "veterinaria",
    estado: 1
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "file" ? files[0] : value, 
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    setFormData((prevState) => {
      if (checked) {
        return { ...prevState, diasDisponibles: [...prevState.diasDisponibles, value] };
      } else {
        return {
          ...prevState,
          diasDisponibles: prevState.diasDisponibles.filter((dia) => dia !== value),
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "diasDisponibles") {
        dataToSend.append(key, JSON.stringify(formData[key]));
      } else {
        dataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch("http://localhost:8080/usuario/Registrar", {
        method: "POST",
        body: dataToSend,
      });

      if (response.ok) {
        alert("Usuario registrado exitosamente");
        dirigir("/Usuario/Consultar");
      } else {
        alert("Error al registrar el usuario");
      }
    } catch (error) {
      console.error("Error al registrar el usuario", error);
    }
  };

  return (
    <PlantillaUno>
      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow p-4">
              <h2 className="mb-4">Registro de Usuario</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="nombreVeterinaria" className="form-label">
                    Nombre de la veterinaria:
                  </label>
                  <input
                    type="text"
                    id="nombreVeterinaria"
                    name="nombreVeterinaria"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.nombreVeterinaria}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="logo" className="form-label">
                    Logo de la veterinaria:
                  </label>
                  <input
                    type="file"
                    id="logo"
                    name="logo"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="nombreResponsable" className="form-label">
                    Nombre del responsable:
                  </label>
                  <input
                    type="text"
                    id="nombreResponsable"
                    name="nombreResponsable"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.nombreResponsable}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="correoContacto" className="form-label">
                    Correo de contacto:
                  </label>
                  <input
                    type="email"
                    id="correoContacto"
                    name="correoContacto"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.correoContacto}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="correoUsuario" className="form-label">
                    Correo de inicio:
                  </label>
                  <input
                    type="email"
                    id="correoUsuario"
                    name="correoUsuario"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.correoUsuario}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="contrasenaUsuario" className="form-label">
                    Contraseña:
                  </label>
                  <input
                    type="password"
                    id="contrasenaUsuario"
                    name="contrasenaUsuario"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.contrasenaUsuario}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="direccionVeterinaria" className="form-label">
                    Dirección de la veterinaria:
                  </label>
                  <input
                    type="text"
                    id="direccionVeterinaria"
                    name="direccionVeterinaria"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.direccionVeterinaria}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="telefono" className="form-label">
                    Teléfono de contacto:
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.telefono}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="horariosAtencion" className="form-label">
                    Horarios de atención:
                  </label>
                  <input
                    type="text"
                    id="horariosAtencion"
                    name="horariosAtencion"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.horariosAtencion}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Días de la semana disponibles:</label>
                  <div>
                    {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((dia, index) => (
                      <div key={index} className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`checkbox-${index}`}
                          value={dia}
                          onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label" htmlFor={`checkbox-${index}`}>
                          {dia}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <button type="submit" className="btn btn-dark">
                    Registrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PlantillaUno>
  );
};

export default RegistroUsuarioVeterinario;
