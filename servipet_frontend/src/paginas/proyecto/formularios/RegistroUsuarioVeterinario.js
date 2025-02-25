import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import PlantillaDos from "../../../componentes/PlantillaDos";

const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

const RegistroUsuarioVeterinario = () => {
  const dirigir = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);

  const initialValues = {
    imagenUsuarioDto: "",
    nombreUsuarioDto: "",
    correoContactoDto: "",
    correoUsuarioDto: "",
    contrasenaUsuarioDto: "",
    confirmarContrasena: "",
    direccionUsuarioDto: "",
    telefonoUsuarioDto: "",
    horarioAtencionDto: diasSemana.map((diaDto) => ({
      diaDto,
      aperturaDto: "",
      cierreDto: "",
      cerrado: false,
    })),
    rolUsuarioDto: "veterinaria",
  };

  const validationSchema = Yup.object({
    nombreUsuarioDto: Yup.string()
      .matches(
        "^(?!([a-zA-Z0-9])\\1{2,}$).{6,20}$",
        "El nombre de usuario no puede tener más de 2 caracteres consecutivos iguales"
      )
      .required("El nombre es obligatorio"),
    correoContactoDto: Yup.string()
      .email("Correo inválido")
      .required("El correo es obligatorio"),
    correoUsuarioDto: Yup.string()
      .email("Correo inválido")
      .required("El correo es obligatorio"),
    contrasenaUsuarioDto: Yup.string()
      .min(8, "La contraseña debe tener al menos 8 caracteres.")
      .matches(/[A-Z]/, "Debe contener al menos una mayúscula.")
      .matches(/[0-9]/, "Debe contener al menos un número.")
      .matches(/\W/, "Debe contener al menos un carácter especial.")
      .required("Contraseña obligatoria."),
    confirmarContrasena: Yup.string()
      .oneOf([Yup.ref("contrasenaUsuarioDto"), null], "Las contraseñas deben coincidir")
      .required("Debe confirmar la contraseña."),
    direccionUsuarioDto: Yup.string()
      .min(10, "La dirección debe tener al menos 10 caracteres.")
      .max(50, "La dirección no puede superar los 50 caracteres.")
      .required("La dirección es obligatoria"),
    telefonoUsuarioDto: Yup.string()
      .matches(/^[0-9]{10}$/, "El teléfono debe tener exactamente 10 dígitos")
      .required("El teléfono es obligatorio"),
      });

  const handleSubmit = async (values, { setErrors }) => {
    console.log("Se está ejecutando handleSubmit", values);
    try {
      const response = await fetch("http://localhost:8080/usuario/Registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const responseText = await response.text();

      if (response.ok) {
        alert("Usuario registrado con éxito");
        dirigir("/");
      } else {
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
  };

  return (
    <PlantillaDos>
      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card2 shadow p-4">
              <h2 className="mb-4">Registro de Usuario</h2>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ values, setFieldValue }) => (
                  <Form>
                    {/* Mapeo de campos de formulario */}
                    {["nombreUsuarioDto", "correoContactoDto", "correoUsuarioDto", "contrasenaUsuarioDto", "confirmarContrasena", "direccionUsuarioDto", "telefonoUsuarioDto"].map((fieldName) => (
                      <div className="mb-3" key={fieldName}>
                        <label htmlFor={fieldName}>
                          {fieldName.replace(/([A-Z])/g, ' $1').toUpperCase()}
                        </label>
                        <Field type={fieldName.includes("contrasena") ? "password" : "text"} name={fieldName} className="form-control" />
                        <ErrorMessage name={fieldName} component="div" className="text-danger" />
                      </div>
                    ))}

                    <div className="mb-3">
                      <label htmlFor="imagenUsuarioDto">Logo de la veterinaria:</label>
                      <input
                        type="file"
                        className="form-control"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setFieldValue("imagenUsuarioDto", reader.result.split(",")[1]);
                              setPreviewImage(reader.result);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </div>
                    {previewImage && <img src={previewImage} alt="Vista previa" />}

                    {/* Mapeo de horarios de atención */}
                    {values.horarioAtencionDto.map((diaObj, index) => (
                      <div className="row mb-2" key={diaObj.diaDto}>
                        <div className="col-4">
                          <label className="form-label">{diaObj.diaDto}</label>
                        </div>
                        <div className="col-3">
                          <Field
                            type="time"
                            name={`horarioAtencionDto[${index}].aperturaDto`}
                            className="form-control"
                            disabled={diaObj.cerrado}
                          />
                        </div>
                        <div className="col-3">
                          <Field
                            type="time"
                            name={`horarioAtencionDto[${index}].cierreDto`}
                            className="form-control"
                            disabled={diaObj.cerrado}
                          />
                        </div>
                        <div className="col-2">
                          <Field
                            type="checkbox"
                            name={`horarioAtencionDto[${index}].cerrado`}
                            className="form-check-input"
                            onChange={(e) => {
                              setFieldValue(`horarioAtencionDto[${index}].cerrado`, e.target.checked);
                              if (e.target.checked) {
                                setFieldValue(`horarioAtencionDto[${index}].aperturaDto`, "");
                                setFieldValue(`horarioAtencionDto[${index}].cierreDto`, "");
                              }
                            }}
                          />
                          <label className="form-check-label ms-1">Cerrado</label>
                        </div>
                      </div>
                    ))}

                    <button type="submit" className="btn btn-dark">Registrar</button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </PlantillaDos>
  );
};

export default RegistroUsuarioVeterinario;

