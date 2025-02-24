import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
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
    direccionUsuarioDto: "",
    telefonoUsuarioDto: "",
    horarioAtencionDto: "",
    diasDisponiblesDto: diasSemana.map((dia) => ({
      dia,
      apertura: "",
      cierre: "",
      cerrado: false,
    })),
    rolUsuarioDto: "veterinaria",
  };

  const validationSchema = Yup.object({
    nombreUsuarioDto: Yup.string().required("El nombre es obligatorio"),
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
    direccionUsuarioDto: Yup.string().required("La dirección es obligatoria"),
    telefonoUsuarioDto: Yup.string()
      .matches(/^[0-9]+$/, "Solo se permiten números")
      .required("El teléfono es obligatorio"),
    horarioAtencionDto: Yup.string().required("El horario es obligatorio"),
  });

  const handleSubmit = async (values, { setErrors }) => {
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
                    <div className="mb-3">
                      <label htmlFor="nombreUsuarioDto">Nombre de la veterinaria:</label>
                      <Field type="text" name="nombreUsuarioDto" className="form-control" />
                      <ErrorMessage name="nombreUsuarioDto" component="div" className="text-danger" />
                    </div>

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

                    <div className="mb-3">
                      <label htmlFor="correoContactoDto">Correo de contacto:</label>
                      <Field type="email" name="correoContactoDto" className="form-control" />
                      <ErrorMessage name="correoContactoDto" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="correoUsuarioDto">Correo de inicio:</label>
                      <Field type="email" name="correoUsuarioDto" className="form-control" />
                      <ErrorMessage name="correoUsuarioDto" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="contrasenaUsuarioDto">Contraseña:</label>
                      <Field type="password" name="contrasenaUsuarioDto" className="form-control" />
                      <ErrorMessage name="contrasenaUsuarioDto" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="direccionUsuarioDto">Dirección de la veterinaria:</label>
                      <Field type="text" name="direccionUsuarioDto" className="form-control" />
                      <ErrorMessage name="direccionUsuarioDto" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="telefonoUsuarioDto">Teléfono de contacto:</label>
                      <Field type="tel" name="telefonoUsuarioDto" className="form-control" />
                      <ErrorMessage name="telefonoUsuarioDto" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="horarioAtencionDto">Horarios de atención:</label>
                      <Field type="text" name="horarioAtencionDto" className="form-control" />
                      <ErrorMessage name="horarioAtencionDto" component="div" className="text-danger" />
                    </div>

                    {values.diasDisponiblesDto.map((diaObj, index) => (
                      <div className="row mb-2" key={diaObj.dia}>
                        <div className="col-4">
                          <label className="form-label">{diaObj.dia}</label>
                        </div>
                        <div className="col-3">
                          <Field type="time" name={`diasDisponiblesDto[${index}].apertura`} className="form-control" disabled={diaObj.cerrado} />
                        </div>
                        <div className="col-3">
                          <Field type="time" name={`diasDisponiblesDto[${index}].cierre`} className="form-control" disabled={diaObj.cerrado} />
                        </div>
                        <div className="col-2">
                          <Field
                            type="checkbox"
                            name={`diasDisponiblesDto[${index}].cerrado`}
                            className="form-check-input"
                            onChange={(e) => {
                              setFieldValue(`diasDisponiblesDto[${index}].cerrado`, e.target.checked);
                              if (e.target.checked) {
                                setFieldValue(`diasDisponiblesDto[${index}].apertura`, "");
                                setFieldValue(`diasDisponiblesDto[${index}].cierre`, "");
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
