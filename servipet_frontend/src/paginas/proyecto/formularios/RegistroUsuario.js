import React, { useState } from "react";

const RegistroUsuario = () => {
  const [formData, setFormData] = useState({
    nombre_usuario: "",
    correo_usuario: "",
    contrasena_usuario: "",
    contrasena_usuario_confirmation: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
<<<<<<< HEAD
    setFormData(prevState => ({
      ...prevState,
      [name]: value
=======
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
>>>>>>> dd6e9cfec9318f1c367b89c30009eec2f6fadfdc
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.nombre_usuario) newErrors.nombre_usuario = "Nombre de usuario es obligatorio.";
    if (!formData.correo_usuario) newErrors.correo_usuario = "Correo electrónico es obligatorio.";
    if (!formData.contrasena_usuario) newErrors.contrasena_usuario = "Contraseña es obligatoria.";
    if (formData.contrasena_usuario !== formData.contrasena_usuario_confirmation) {
      newErrors.contrasena_usuario_confirmation = "Las contraseñas no coinciden.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch("http://localhost:8080/RegistroUsuario", {
          method: "POST",
          headers: {
<<<<<<< HEAD
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }

        // Handle response
        console.log("Formulario enviado:", formData);
      } catch (error) {
        console.error("Error al enviar el formulario:", error);
=======
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          console.log("Formulario enviado:", formData);
          // Maneja la respuesta del servidor aquí
        } else {
          // Maneja el caso en que la respuesta no es OK
          console.error("Error en el registro del usuario.");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
>>>>>>> dd6e9cfec9318f1c367b89c30009eec2f6fadfdc
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mb-4">Registro de Usuario</h2>
          <form onSubmit={handleSubmit} id="registroUsuario">
            <div className="mb-3">
              <label htmlFor="nombre_usuario" className="form-label">Nombre de Usuario:</label>
              <input
                type="text"
                id="nombre_usuario"
                name="nombre_usuario"
                className={`form-control ${errors.nombre_usuario ? 'is-invalid' : ''}`}
                value={formData.nombre_usuario}
                onChange={handleChange}
                required
              />
              {errors.nombre_usuario && (
                <span className="invalid-feedback" role="alert">
                  <strong>{errors.nombre_usuario}</strong>
                </span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="correo_usuario" className="form-label">Correo electrónico:</label>
              <input
                type="email"
                id="correo_usuario"
                name="correo_usuario"
                className={`form-control ${errors.correo_usuario ? 'is-invalid' : ''}`}
                value={formData.correo_usuario}
                onChange={handleChange}
                required
              />
              {errors.correo_usuario && (
                <span className="invalid-feedback" role="alert">
                  <strong>{errors.correo_usuario}</strong>
                </span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="contrasena_usuario" className="form-label">Contraseña:</label>
              <input
                type="password"
                id="contrasena_usuario"
                name="contrasena_usuario"
                className={`form-control ${errors.contrasena_usuario ? 'is-invalid' : ''}`}
                value={formData.contrasena_usuario}
                onChange={handleChange}
                required
              />
              {errors.contrasena_usuario && (
                <span className="invalid-feedback" role="alert">
                  <strong>{errors.contrasena_usuario}</strong>
                </span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="contrasena_usuario_confirmation" className="form-label">Confirmar Contraseña:</label>
              <input
                type="password"
                id="contrasena_usuario_confirmation"
                name="contrasena_usuario_confirmation"
                className={`form-control ${errors.contrasena_usuario_confirmation ? 'is-invalid' : ''}`}
                value={formData.contrasena_usuario_confirmation}
                onChange={handleChange}
                required
              />
              {errors.contrasena_usuario_confirmation && (
                <span className="invalid-feedback" role="alert">
                  <strong>{errors.contrasena_usuario_confirmation}</strong>
                </span>
              )}
            </div>
            <div>
              <button type="submit" className="btn btn-dark">Registrarse</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistroUsuario;
