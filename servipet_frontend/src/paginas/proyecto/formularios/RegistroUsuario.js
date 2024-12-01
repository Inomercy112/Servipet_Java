import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlantillaTres from "../../../componentes/PlantillaDos";
import banner from "../../../img/Servipettit.png";

const RegistroUsuario = () => {
  const dirigir = useNavigate();
  const [formData, setFormData] = useState({
    nombreUsuarioDto: "",
    correoUsuarioDto: "",
    contrasenaUsuarioDto: "",
    confirmarContrasena: "",
    rolUsuarioDto: "cliente",
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
    if (!formData.nombreUsuarioDto)
      newErrors.nombreUsuarioDto = "Nombre de usuario es obligatorio.";
    if (!formData.correoUsuarioDto)
      newErrors.correoUsuarioDto = "Correo electrónico es obligatorio.";
    if (!formData.contrasenaUsuarioDto)
      newErrors.contrasenaUsuarioDto = "Contraseña es obligatoria.";
    if (formData.contrasenaUsuarioDto !== formData.confirmarContrasena) {
      newErrors.confirmarContrasena = "Las contraseñas no coinciden.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch(
          "http://localhost:8080/usuario/Registrar",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          alert("Usuario registrado con éxito");
          dirigir("/");
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
          <div className="col-md-5">
            <img
              src={banner}
              alt="banner"
              className="img-fluid mx-auto d-block mb-4"
              height="100"
            />
      <div className="card2 shadow p-4">
      <h2 className="text-center mb-4">Registro de Usuario</h2>
              <form onSubmit={handleSubmit} id="registroUsuario">
                <div className="mb-3">
                  <label htmlFor="nombreUsuarioDto" className="form-label">
                    Nombre de Usuario:
                  </label>
                  <input
                    type="text"
                    id="nombreUsuarioDto"
                    name="nombreUsuarioDto"
                    className={`form-control ${
                      errors.nombreUsuarioDto ? "is-invalid" : ""
                    }`}
                    value={formData.nombreUsuarioDto}
                    onChange={handleChange}
                  />
                  {errors.nombreUsuarioDto && (
                    <div className="invalid-feedback">
                      <strong>{errors.nombreUsuarioDto}</strong>
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="correoUsuarioDto" className="form-label">
                    Correo electrónico:
                  </label>
                  <input
                    type="email"
                    id="correoUsuarioDto"
                    name="correoUsuarioDto"
                    className={`form-control ${
                      errors.correoUsuarioDto ? "is-invalid" : ""
                    }`}
                    value={formData.correoUsuarioDto}
                    onChange={handleChange}
                  />
                  {errors.correoUsuarioDto && (
                    <div className="invalid-feedback">
                      <strong>{errors.correoUsuarioDto}</strong>
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="contrasenaUsuarioDto" className="form-label">
                    Contraseña:
                  </label>
                  <input
                    type="password"
                    id="contrasenaUsuarioDto"
                    name="contrasenaUsuarioDto"
                    className={`form-control ${
                      errors.contrasenaUsuarioDto ? "is-invalid" : ""
                    }`}
                    value={formData.contrasenaUsuarioDto}
                    onChange={handleChange}
                  />
                  {errors.contrasenaUsuarioDto && (
                    <div className="invalid-feedback">
                      <strong>{errors.contrasenaUsuarioDto}</strong>
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="confirmarContrasena"
                    className="form-label"
                  >
                    Confirmar Contraseña:
                  </label>
                  <input
                    type="password"
                    id="confirmarContrasena"
                    name="confirmarContrasena"
                    className={`form-control ${
                      errors.confirmarContrasena ? "is-invalid" : ""
                    }`}
                    value={formData.confirmarContrasena}
                    onChange={handleChange}
                  />
                  {errors.confirmarContrasena && (
                    <div className="invalid-feedback">
                      <strong>{errors.confirmarContrasena}</strong>
                    </div>
                  )}
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-dark">
                    Registrarse
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PlantillaTres>
  );
};

export default RegistroUsuario;
