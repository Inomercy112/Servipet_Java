import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const ContrasenaRecordar = () => {
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Validación con Yup
  const validationSchema = Yup.object({
    contrasenaUsuarioDto: Yup.string()
      .min(8, "La contraseña debe tener al menos 8 caracteres.")
      .matches(/[A-Z]/, "Debe contener al menos una mayúscula.")
      .matches(/[0-9]/, "Debe contener al menos un número.")
      .matches(/[\W_]/, "Debe contener al menos un carácter especial.")
      .required("Contraseña obligatoria."),
    confirmarContrasena: Yup.string()
      .oneOf([Yup.ref("contrasenaUsuarioDto")], "Las contraseñas no coinciden.")
      .required("Debes confirmar tu contraseña."),
  });

  useEffect(() => {
  const params = new URLSearchParams(location.search);
  const tokenParam = params.get('token');
  if (tokenParam) {
    setToken(tokenParam);
    sessionStorage.setItem("resetToken", tokenParam);
  }
}, [location]);

useEffect(() => {
  const savedToken = sessionStorage.getItem("resetToken");
  if (savedToken) {
    setToken(savedToken);
  }
}, []);


  const ActualizarContrasena = async (values) => {
    try {
      const response = await fetch(`${backendUrl}/mail/Cambiar-Contrasena`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ contrasenaUsuarioDto: values.contrasenaUsuarioDto, token }),
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
            <Formik
              initialValues={{
                contrasenaUsuarioDto: '',
                confirmarContrasena: ''
              }}
              validationSchema={validationSchema}
              onSubmit={ActualizarContrasena}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="mb-3">
                    <label htmlFor="contrasenaUsuarioDto" className="form-label">
                      Nueva contraseña:
                    </label>
                    <Field
                      type="password"
                      id="contrasenaUsuarioDto"
                      name="contrasenaUsuarioDto"
                      className={`form-control ${touched.contrasenaUsuarioDto && errors.contrasenaUsuarioDto ? "is-invalid" : ""}`}
                    />
                    <ErrorMessage
                      name="contrasenaUsuarioDto"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="confirmarContrasena" className="form-label">
                      Confirmar Contraseña:
                    </label>
                    <Field
                      type="password"
                      id="confirmarContrasena"
                      name="confirmarContrasena"
                      className={`form-control ${touched.confirmarContrasena && errors.confirmarContrasena ? "is-invalid" : ""}`}
                    />
                    <ErrorMessage
                      name="confirmarContrasena"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  <button type="submit" className="btn btn-dark">
                    Recuperar contraseña
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContrasenaRecordar;
