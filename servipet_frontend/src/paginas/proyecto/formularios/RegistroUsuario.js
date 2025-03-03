import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import PlantillaTres from "../../../componentes/PlantillaDos";
import banner from "../../../img/Servipettit.png";
const backendUrl = process.env.REACT_APP_BACKEND_URL;


const RegistroUsuario = () => {
  const navigate = useNavigate();

  // Esquema de validación con Yup
  const validationSchema = Yup.object({
    nombreUsuarioDto: Yup.string()
    .matches(
      "^(?!([a-zA-Z0-9])\\1{2,}$).{6,20}$",
      "El nombre de usuario no puede tener más de 2 caracteres consecutivos iguales"
    )
    .required("Nombre de usuario obligatorio."),
    correoUsuarioDto: Yup.string()
      .email("Correo electrónico no válido")
      
      .required("Correo electrónico obligatorio."),
    contrasenaUsuarioDto: Yup.string().min(8, "La contraseña debe tener al menos 8 caracteres.")
    .matches(/[A-Z]/, "Debe contener al menos una mayuscula.")
    .matches(/[0-9]/, "Debe contener al menos un numero.")
    .matches(/[\W_]/, "Debe contener al menos un caracter especial.")
    .required("Contraseña obligatoria."),
    confirmarContrasena: Yup.string()
      .oneOf([Yup.ref("contrasenaUsuarioDto")], "Las contraseñas no coinciden.")
      .required("Debes confirmar tu contraseña."),
  });

  // Configuración de Formik
  const formik = useFormik({
    initialValues: {
      nombreUsuarioDto: "",
      correoUsuarioDto: "",
      contrasenaUsuarioDto: "",
      confirmarContrasena: "",
      rolUsuarioDto: "cliente",
    },
    validationSchema,
    onSubmit: async (values, { setErrors }) => {
      try {
        const response = await fetch(`${backendUrl}/usuario/Registrar`, {
          method: "POST",
          headers: { "Content-Type": "application/json",
            'ngrok-skip-browser-warning': 'true'
           },
          body: JSON.stringify(values),
        });
        const responseText = await response.text();

        if (response.ok) {
          alert("Usuario registrado con éxito");
          navigate("/");
        }else{
          if (responseText === "Correo ya existente") {
            setErrors({ correoUsuarioDto: "Este correo ya está registrado." });
          } else if (responseText === "Nombre Usuario ya existe") {
            setErrors({ nombreUsuarioDto: "Este nombre de usuario ya existe." });
          } else {
            alert("Ocurrió un error inesperado");
          }
        }
      } catch (error) {
        console.error("Error al enviar el formulario:", error);
        alert("Ocurrió un error inesperado");
      }
    },
  });

  return (
    <PlantillaTres title="Registro Usuario">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <img src={banner} alt="banner" className="img-fluid mx-auto d-block mb-4" />
            <div className="card2 shadow p-4">
              <h2 className="text-center mb-4">Registro de Usuario</h2>
              <form onSubmit={formik.handleSubmit}>
                {[
                  { label: "Nombre de Usuario", name: "nombreUsuarioDto", type: "text" },
                  { label: "Correo electrónico", name: "correoUsuarioDto", type: "email" },
                  { label: "Contraseña", name: "contrasenaUsuarioDto", type: "password" },
                  { label: "Confirmar Contraseña", name: "confirmarContrasena", type: "password" },
                ].map(({ label, name, type }) => (
                  <div className="mb-3" key={name}>
                    <label htmlFor={name} className="form-label">{label}:</label>
                    <input
                      type={type}
                      id={name}
                      name={name}
                      className={`form-control ${formik.touched[name] && formik.errors[name] ? "is-invalid" : ""}`}
                      {...formik.getFieldProps(name)}
                    />
                    {formik.touched[name] && formik.errors[name] && (
                      <div className="invalid-feedback">{formik.errors[name]}</div>
                    )}
                  </div>
                ))}
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-dark">Registrarse</button>
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
