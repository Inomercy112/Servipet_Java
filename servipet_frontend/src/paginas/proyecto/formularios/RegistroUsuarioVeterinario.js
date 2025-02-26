import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import PlantillaDos from "../../../componentes/PlantillaDos";

const diasSemana = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];

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
      .min(6, "Mínimo 6 caracteres")
      .matches(
        /^(?!([a-zA-Z0-9])\1{2,}).{6,20}$/,
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
    horarioAtencionDto: Yup.array().of(
      Yup.object().shape({
        diaDto: Yup.string().required("El día es obligatorio"),
        aperturaDto: Yup.string().when("cerrado", (cerrado, schema) =>
          cerrado === false ? schema.required("La hora de apertura es obligatoria") : schema
        ),
        cierreDto: Yup.string().when("cerrado", (cerrado, schema) =>
          cerrado === false ? schema.required("La hora de cierre es obligatoria") : schema
        ),
        cerrado: Yup.boolean(),
      })
    ),
    imagenUsuarioDto: Yup.string()
      .required("La imagen es obligatoria")
      .test("fileSize", "El archivo no debe exceder los 5 MB", (value) => {
        if (!value) return true; // Si no hay imagen, no se valida
        const base64Length = value.length - (value.indexOf(",") + 1);
        const sizeInBytes = 4 * Math.ceil(base64Length / 3) * 0.5624896334383812;
        return sizeInBytes <= 5 * 1024 * 1024; // 5 MB
      }),
  });

  const handleSubmit = async (values, { setErrors }) => {
    try {
      // Validar la imagen antes de enviar el formulario
      if (!values.imagenUsuarioDto) {
        setErrors({ imagenUsuarioDto: "La imagen es obligatoria" });
        return;
      }

      const response = await fetch("http://localhost:8080/usuario/Registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const responseData = await response;

      if (response.ok) {
        alert("Usuario registrado con éxito");
        dirigir("/");
      } else {
        if (responseData.message === "Correo ya existente") {
          setErrors({ correoUsuarioDto: "Este correo ya está registrado." });
        } else if (responseData.message === "Nombre Usuario ya existe") {
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
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            // Validar el tamaño del archivo (5 MB máximo)
                            if (file.size > 5 * 1024 * 1024) {
                              alert("El archivo no debe exceder los 5 MB.");
                              e.target.value = ""; // Limpiar el input
                              return;
                            }
                            // Validar el tipo de archivo (solo imágenes)
                            if (!file.type.startsWith("image/")) {
                              alert("Solo se permiten archivos de tipo imagen.");
                              e.target.value = ""; // Limpiar el input
                              return;
                            }
                            // Si pasa las validaciones, procesar la imagen
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setFieldValue("imagenUsuarioDto", reader.result.split(",")[1]);
                              setPreviewImage(reader.result);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      <ErrorMessage name="imagenUsuarioDto" component="div" className="text-danger" />
                    </div>

                    {previewImage && (
                      <img src={previewImage} alt="Vista previa" className="preview-image" />
                    )}

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
                      <label htmlFor="confirmarContrasena">Confirmar contraseña:</label>
                      <Field type="password" name="confirmarContrasena" className="form-control" />
                      <ErrorMessage name="confirmarContrasena" component="div" className="text-danger" />
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

                    <button type="submit" className="btn btn-dark">
                      Registrar
                    </button>
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