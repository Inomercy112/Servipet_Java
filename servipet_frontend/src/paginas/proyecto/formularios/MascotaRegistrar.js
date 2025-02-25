import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import PlantillaTres from "../../../componentes/PlantillaTres";
import { DatosTipo } from '../../../consultas/DatosTipo';
import { useAuth } from '../../../context/AuthContext';

const today = new Date().toISOString().split("T")[0];
const maxDate = new Date();
maxDate.setFullYear(maxDate.getFullYear() - 100);
const minBirthDate = maxDate.toISOString().split("T")[0];

const MascotaRegistrar = () => {
  const { token } = useAuth();
  const dirigir = useNavigate();
  const [tipo, setTipo] = useState([]);

  useEffect(() => {
    const cargarTipos = async () => {
      try {
        const data = await DatosTipo(token);
        setTipo(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error("Error al cargar los tipos", error);
      }
    };
    cargarTipos();
  }, [token]);

  // Esquema de validación con Yup
  const validationSchema = Yup.object().shape({
    mascotas: Yup.array().of(
      Yup.object().shape({
        nombreMascotaDto: Yup.string()
          .min(2, "Mínimo 2 caracteres")
          .max(25, "Máximo 25 caracteres")
          .matches(/^(?!.*(.)\1{2,})/, "No más de 2 caracteres repetidos")
          .required("Campo obligatorio"),
        fechaNacimientoMascotaDto: Yup.date()
          .max(today, "No puede ser en el futuro")
          .min(minBirthDate, "No puede tener más de 100 años")
          .required("Campo obligatorio"),
        tipoMascotaDto: Yup.string().required("Campo obligatorio"),
        razaMascotaDto: Yup.string().required("Campo obligatorio"),
        pesoMascotaDto: Yup.number()
          .min(0, "No puede ser negativo")
          .max(100, "Máximo 100 kg")
          .required("Campo obligatorio"),
      })
    ),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch("http://localhost:8080/mascota/Registrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(values.mascotas),
      });

      if (response.ok) {
        alert("Mascota registrada!");
        dirigir("/Mascota/Consultar");
      } else {
        alert("Error al registrar la mascota.");
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      alert("Ocurrió un error inesperado");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PlantillaTres title="Registro Mascota">
      <div className="container mt-5">
        <div className="card2 shadow p-4">
          <h1>Registro de Mascotas</h1>
          <Formik
            initialValues={{
              mascotas: [
                {
                  nombreMascotaDto: "",
                  fechaNacimientoMascotaDto: "",
                  duenoMascotaDto: localStorage["id"],
                  antecedentesMascotaDto: "",
                  tipoMascotaDto: "",
                  razaMascotaDto: "",
                  pesoMascotaDto: "",
                  tamanoMascotaDto: "",
                  estadoMascotaDto: 1,
                },
              ],
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, isSubmitting }) => (
              <Form id="registroMascota">
                <FieldArray name="mascotas">
                  {({ push, remove }) => (
                    <>
                      {values.mascotas.map((_, index) => (
                        <div key={index} className="mb-4 border p-3 rounded">
                          <h5>Mascota {index + 1}</h5>

                          <div className="mb-3">
                            <label className="form-label">Nombre de la Mascota</label>
                            <Field type="text" className="form-control" name={`mascotas[${index}].nombreMascotaDto`} />
                            <ErrorMessage name={`mascotas[${index}].nombreMascotaDto`} component="div" className="text-danger" />
                          </div>

                          <div className="mb-3">
                            <label className="form-label">Tipo de Mascota</label>
                            <Field as="select" className="form-select" name={`mascotas[${index}].tipoMascotaDto`}>
                              <option value="">Selecciona el tipo de mascota</option>
                              {tipo.map((tipos) => (
                                <option key={tipos.id} value={tipos.id}>
                                  {tipos.nombreTipo}
                                </option>
                              ))}
                            </Field>
                            <ErrorMessage name={`mascotas[${index}].tipoMascotaDto`} component="div" className="text-danger" />
                          </div>

                          <div className="mb-3">
                            <label className="form-label">Fecha de nacimiento</label>
                            <Field type="date" className="form-control" name={`mascotas[${index}].fechaNacimientoMascotaDto`} max={today} />
                            <ErrorMessage name={`mascotas[${index}].fechaNacimientoMascotaDto`} component="div" className="text-danger" />
                          </div>

                          <div className="mb-3">
                            <label className="form-label">Raza</label>
                            <Field type="text" className="form-control" name={`mascotas[${index}].razaMascotaDto`} />
                            <ErrorMessage name={`mascotas[${index}].razaMascotaDto`} component="div" className="text-danger" />
                          </div>

                          <div className="mb-3">
                            <label className="form-label">Peso (kg)</label>
                            <Field type="number" className="form-control" name={`mascotas[${index}].pesoMascotaDto`} min="0" max="100" step="0.01" />
                            <ErrorMessage name={`mascotas[${index}].pesoMascotaDto`} component="div" className="text-danger" />
                          </div>

                          <button type="button" className="btn btn-danger" onClick={() => remove(index)}>
                            Eliminar Mascota
                          </button>
                        </div>
                      ))}

                      <button type="button" className="btn btn-primary mt-3" onClick={() => push({
                        nombreMascotaDto: "",
                        fechaNacimientoMascotaDto: "",
                        duenoMascotaDto: localStorage["id"],
                        antecedentesMascotaDto: "",
                        tipoMascotaDto: "",
                        razaMascotaDto: "",
                        pesoMascotaDto: "",
                        tamanoMascotaDto: "",
                        estadoMascotaDto: 1,
                      })}>
                        + Agregar otra mascota
                      </button>
                    </>
                  )}
                </FieldArray>

                <button type="submit" className="btn btn-dark mt-3" disabled={isSubmitting}>
                  {isSubmitting ? "Registrando..." : "Registrar Mascotas"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </PlantillaTres>
  );
};

export default MascotaRegistrar;
