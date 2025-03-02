import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import PlantillaTres from "../../componentes/PlantillaTres";
import { DatosUsuario } from "../../consultas/DatosPersonales";
import { useAuth } from "../../context/AuthContext";

function ActualizarUsuario() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nombreUsuarioDto: "",
    documentoUsuarioDto: "",
    correoUsuarioDto: "",
    contrasenaUsuarioDto: "",
    fechaNacimientoDto: "",
    direccionUsuarioDto: "",
    telefonoUsuarioDto: "",
    rolUsuarioDto: "",
    estadoUsuarioDto: ""
  });

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
    contrasenaUsuarioDto: Yup.string()
      .min(8, "La contraseña debe tener al menos 8 caracteres.")
      .matches(/[A-Z]/, "Debe contener al menos una mayúscula.")
      .matches(/[0-9]/, "Debe contener al menos un número.")
      .matches(/[\W_]/, "Debe contener al menos un carácter especial.")
      .required("Contraseña obligatoria."),
    fechaNacimientoDto: Yup.date().required("La fecha de nacimiento es obligatoria."),
    telefonoUsuarioDto: Yup.string()
      .matches(/^[0-9]{10}$/, "El teléfono debe tener 10 dígitos.")
      .required("Teléfono obligatorio."),
    direccionUsuarioDto: Yup.string().required("Dirección obligatoria.")
  });

  // Configuración de Formik
  const formik = useFormik({
    initialValues: usuario,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const usuarioFiltrado = Object.fromEntries(
          Object.entries(values).filter(([key, value]) => value !== "")
        );

        const response = await fetch(
          `http://localhost:8080/usuario/Actualizar/${localStorage['id']}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(usuarioFiltrado),
          }
        );

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', data.token);
          localStorage.setItem("nombreUsuario", usuarioFiltrado.nombreUsuarioDto);

          alert("Datos actualizados correctamente");

          navigate("/Usuario/Perfil");
          navigate(0);
        } else {
          alert("Error al actualizar los datos");
        }
      } catch (error) {
        console.error("Error al enviar el formulario: ", error);
        alert("Ocurrió un error inesperado");
      }
    },
  });

  // Cargar los datos del usuario
  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const data = await DatosUsuario(token);
        setUsuario({
          nombreUsuarioDto: data?.nombreUsuarioDto || "",
          documentoUsuarioDto: data?.documentoUsuarioDto || "",
          correoUsuarioDto: data?.correoUsuarioDto || "",
          contrasenaUsuarioDto: data?.contrasenaUsuarioDto || "",
          fechaNacimientoDto: data?.fechaNacimientoDto || "",
          direccionUsuarioDto: data?.direccionUsuarioDto || "",
          telefonoUsuarioDto: data?.telefonoUsuarioDto || "",
          rolUsuarioDto: data?.rolUsuarioDto || "",
          estadoUsuarioDto: data?.estadoUsuarioDto || ""
        });
      } catch (error) {
        console.error('Error al cargar los datos de usuario', error);
      }
    };
    cargarUsuarios();
  }, [token]);

  return (
    <PlantillaTres>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="mb-4">Actualizar Usuario</h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre:</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombreUsuarioDto"
                  className={`form-control ${formik.touched.nombreUsuarioDto && formik.errors.nombreUsuarioDto ? "is-invalid" : ""}`}
                  value={formik.values.nombreUsuarioDto}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.nombreUsuarioDto && formik.errors.nombreUsuarioDto && (
                  <div className="invalid-feedback">{formik.errors.nombreUsuarioDto}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="documento" className="form-label">Documento:</label>
                <input
                  type="number"
                  id="documento"
                  name="documentoUsuarioDto"
                  className="form-control"
                  value={formik.values.documentoUsuarioDto}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="correo" className="form-label">Correo electrónico:</label>
                <input
                  type="email"
                  id="correo"
                  name="correoUsuarioDto"
                  className={`form-control ${formik.touched.correoUsuarioDto && formik.errors.correoUsuarioDto ? "is-invalid" : ""}`}
                  value={formik.values.correoUsuarioDto}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.correoUsuarioDto && formik.errors.correoUsuarioDto && (
                  <div className="invalid-feedback">{formik.errors.correoUsuarioDto}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="contrasena" className="form-label">Contraseña:</label>
                <input
                  type="password"
                  id="contrasena"
                  name="contrasenaUsuarioDto"
                  className={`form-control ${formik.touched.contrasenaUsuarioDto && formik.errors.contrasenaUsuarioDto ? "is-invalid" : ""}`}
                  value={formik.values.contrasenaUsuarioDto}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.contrasenaUsuarioDto && formik.errors.contrasenaUsuarioDto && (
                  <div className="invalid-feedback">{formik.errors.contrasenaUsuarioDto}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento:</label>
                <input
                  type="date"
                  id="fechaNacimiento"
                  name="fechaNacimientoDto"
                  className={`form-control ${formik.touched.fechaNacimientoDto && formik.errors.fechaNacimientoDto ? "is-invalid" : ""}`}
                  value={formik.values.fechaNacimientoDto}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.fechaNacimientoDto && formik.errors.fechaNacimientoDto && (
                  <div className="invalid-feedback">{formik.errors.fechaNacimientoDto}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="direccion" className="form-label">Dirección de Residencia:</label>
                <input
                  type="text"
                  id="direccion"
                  name="direccionUsuarioDto"
                  className={`form-control ${formik.touched.direccionUsuarioDto && formik.errors.direccionUsuarioDto ? "is-invalid" : ""}`}
                  value={formik.values.direccionUsuarioDto}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.direccionUsuarioDto && formik.errors.direccionUsuarioDto && (
                  <div className="invalid-feedback">{formik.errors.direccionUsuarioDto}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="telefono" className="form-label">Teléfono:</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefonoUsuarioDto"
                  className={`form-control ${formik.touched.telefonoUsuarioDto && formik.errors.telefonoUsuarioDto ? "is-invalid" : ""}`}
                  value={formik.values.telefonoUsuarioDto}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.telefonoUsuarioDto && formik.errors.telefonoUsuarioDto && (
                  <div className="invalid-feedback">{formik.errors.telefonoUsuarioDto}</div>
                )}
              </div>

              <div>
                <button type="submit" className="btn btn-dark">Actualizar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PlantillaTres>
  );
}

export default ActualizarUsuario;
