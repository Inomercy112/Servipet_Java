import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlantillaTres from "../../../componentes/PlantillaDos";
const RegistroUsuario = () => {
  const dirigir = useNavigate();
  const [formData, setFormData] = useState({
    nombreUsuario: "", 
    correoUsuario: "",
    contrasenaUsuario: "",
    confirmarContrasena: "",
    rol:3,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.nombreUsuario) newErrors.nombreUsuario = "Nombre de usuario es obligatorio.";
    if (!formData.correoUsuario) newErrors.correoUsuario = "Correo electrónico es obligatorio.";
    if (!formData.contrasenaUsuario) newErrors.contrasenaUsuario = "Contraseña es obligatoria.";
    if (formData.contrasenaUsuario !== formData.confirmarContrasena) {
        newErrors.confirmarContrasena = "Las contraseñas no coinciden.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
        try {
            const response = await fetch("http://localhost:8080/usuario/RegistroUsuario", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert("Usuario registrado con éxito");
                dirigir("/");
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message || 'Error en la solicitud'}`);
            }
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
            alert("Ocurrió un error inesperado");
        }
    }
};


  return (
    <PlantillaTres title="Registro Usuario">
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mb-4">Registro de Usuario</h2>
          <form onSubmit={handleSubmit} id="registroUsuario">
            <div className="mb-3">
              <label htmlFor="nombreUsuario" className="form-label">Nombre de Usuario:</label>
              <input
                type="text"
                id="nombreUsuario"
                name="nombreUsuario"
                className={`form-control ${errors.nombreUsuario ? 'is-invalid' : ''}`}
                value={formData.nombreUsuario}
                onChange={handleChange}
                required
              />
              {errors.nombreUsuario && (
                <div className="invalid-feedback">
                  <strong>{errors.nombreUsuario}</strong>
                </div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="correoUsuario" className="form-label">Correo electrónico:</label>
              <input
                type="email"
                id="correoUsuario"
                name="correoUsuario"
                className={`form-control ${errors.correoUsuario ? 'is-invalid' : ''}`}
                value={formData.correoUsuario}
                onChange={handleChange}
                required
              />
              {errors.correoUsuario && (
                <div className="invalid-feedback">
                  <strong>{errors.correoUsuario}</strong>
                </div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="contrasenaUsuario" className="form-label">Contraseña:</label>
              <input
                type="password"
                id="contrasenaUsuario"
                name="contrasenaUsuario"
                className={`form-control ${errors.contrasenaUsuario ? 'is-invalid' : ''}`}
                value={formData.contrasenaUsuario}
                onChange={handleChange}
                required
              />
              {errors.contrasenaUsuario && (
                <div className="invalid-feedback">
                  <strong>{errors.contrasenaUsuario}</strong>
                </div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="confirmarContrasena" className="form-label">Confirmar Contraseña:</label>
              <input
                type="password"
                id="confirmarContrasena"
                name="confirmarContrasena"
                className={`form-control ${errors.confirmarContrasena ? 'is-invalid' : ''}`}
                value={formData.confirmarContrasena}
                onChange={handleChange}
                required
              />
              {errors.confirmarContrasena && (
                <div className="invalid-feedback">
                  <strong>{errors.confirmarContrasena}</strong>
                </div>
              )}
            </div>
            <div>
              <button type="submit" className="btn btn-dark">Registrarse</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </PlantillaTres>
  );
};

export default RegistroUsuario;
