import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ContrasenaRecordar = () => {
  const [token, setToken] = useState('');
  const [contrasenaUsuarioDto, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();  // Para redirigir después de la actualización
  const location = useLocation();
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'contrasenaUsuarioDto') {
      setContrasena(value);
    } else if (name === 'confirmarContrasena') {
      setConfirmarContrasena(value);
    }
  };

  const validateForm = () => {
    let formErrors = {};
    if (!contrasenaUsuarioDto) {
      formErrors.contrasenaUsuarioDto = "La contraseña es requerida";
    }
    if (contrasenaUsuarioDto !== confirmarContrasena) {
      formErrors.confirmarContrasena = "Las contraseñas no coinciden";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0; // Retorna true si no hay errores
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    setToken(token); // Guardar el token en el estado
  }, [location]);
  console.log(token);
  const ActualizarContrasena = async (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/mail/Cambiar-Contrasena/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ contrasenaUsuarioDto: contrasenaUsuarioDto}),
      });

      if (!response.ok) {
        alert("No se pudo actualizar la contraseña");
      } else {
        alert("Contraseña actualizada con éxito");
        navigate("/login"); // Redirige a la página de login
      }
    } catch (e) {
      alert("Error al actualizar la contraseña: " + e);
    }
  };

  return (
    <div className="container mt-7">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card2 shadow p-4">
            <h2 className="mb-4 text-center">Recupera tu contraseña</h2>
            <form onSubmit={ActualizarContrasena}>
              <div className="mb-3">
                <label htmlFor="contrasenaUsuarioDto" className="form-label">
                  Nueva contraseña:
                </label>
                <input
                  type="password"
                  id="contrasenaUsuarioDto"
                  name="contrasenaUsuarioDto"
                  className={`form-control ${errors.contrasenaUsuarioDto ? "is-invalid" : ""}`}
                  value={contrasenaUsuarioDto}
                  onChange={handleChange}
                />
                {errors.contrasenaUsuarioDto && (
                  <div className="invalid-feedback">
                    <strong>{errors.contrasenaUsuarioDto}</strong>
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="confirmarContrasena" className="form-label">
                  Confirmar Contraseña:
                </label>
                <input
                  type="password"
                  id="confirmarContrasena"
                  name="confirmarContrasena"
                  className={`form-control ${errors.confirmarContrasena ? "is-invalid" : ""}`}
                  value={confirmarContrasena}
                  onChange={handleChange}
                />
                {errors.confirmarContrasena && (
                  <div className="invalid-feedback">
                    <strong>{errors.confirmarContrasena}</strong>
                  </div>
                )}
              </div>

              <button type="submit" className="btn btn-dark">
                Recuperar contraseña
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContrasenaRecordar;
