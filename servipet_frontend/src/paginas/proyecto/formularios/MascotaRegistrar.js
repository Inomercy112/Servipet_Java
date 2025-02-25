import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../../context/AuthContext';
import PlantillaTres from "../../../componentes/PlantillaTres";
import { DatosTipo } from '../../../consultas/DatosTipo';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const today = new Date().toISOString().split("T")[0];
const maxDate = new Date();
maxDate.setFullYear(maxDate.getFullYear() - 100);

const validationSchema = Yup.object({
  nombreMascotaDto: Yup.string()
    .min(2, "El nombre debe tener al menos 2 caracteres.")
    .max(25, "El nombre no puede tener más de 25 caracteres.")
    .matches(/^(?!.*(.)\1{2})/, "No puede tener más de 2 caracteres repetidos consecutivos.")
    .required("Nombre de mascota es obligatorio."),
  fechaNacimientoMascotaDto: Yup.date()
    .max(today, "La fecha no puede ser en el futuro.")
    .min(maxDate, "La mascota no puede tener más de 100 años.")
    .required("La fecha de nacimiento es obligatoria."),
  tipoMascotaDto: Yup.string().required("El tipo de mascota es obligatorio."),
  razaMascotaDto: Yup.string().required("La raza es obligatoria."),
  pesoMascotaDto: Yup.number()
    .min(0, "El peso no puede ser negativo.")
    .max(100, "El peso no puede ser mayor a 100 kg.")
    .required("El peso es obligatorio."),
  tamanoMascotaDto: Yup.string().required("El tamaño de la mascota es obligatorio."),
});

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

  return (
    <PlantillaTres title="Registro Mascota">
      <div className="container mt-5">
        <div className="card2 shadow p-4">
          <h1>Registro de Mascota</h1>
          <Formik
            initialValues={{
              nombreMascotaDto: "",
              fechaNacimientoMascotaDto: "",
              duenoMascotaDto: localStorage["id"],
              antecedentesMascotaDto: "",
              tipoMascotaDto: "",
              razaMascotaDto: "",
              pesoMascotaDto: "",
              tamanoMascotaDto: "",
              estadoMascotaDto: 1,
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const response = await fetch("http://localhost:8080/mascota/Registrar", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                  },
                  body: JSON.stringify(values),
                });

                if (response.ok) {
                  alert("Mascota registrada!");
                  dirigir("/Mascota/Consultar");
                }
              } catch (error) {
                console.error("Error al enviar el formulario:", error);
                alert("Ocurrió un error inesperado", error);
              }
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="nombreMascota" className="form-label">Nombre de la Mascota</label>
                  <Field type="text" className="form-control" name="nombreMascotaDto" />
                  <ErrorMessage name="nombreMascotaDto" component="div" className="text-danger" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Tipo de Mascota</label>
                  <Field as="select" className="form-select" name="tipoMascotaDto">
                    <option value="">Selecciona el tipo de mascota</option>
                    {tipo.map(t => (
                      <option key={t.id} value={t.id}>{t.nombreTipo}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="tipoMascotaDto" component="div" className="text-danger" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Tamaño de mascota</label>
                  <Field as="select" className="form-select" name="tamanoMascotaDto">
                    <option value="">Selecciona el tamaño de tu mascota</option>
                    <option value="1">Grande</option>
                    <option value="2">Mediano</option>
                    <option value="3">Pequeño</option>
                  </Field>
                  <ErrorMessage name="tamanoMascotaDto" component="div" className="text-danger" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Fecha de nacimiento</label>
                  <Field type="date" className="form-control" name="fechaNacimientoMascotaDto" max={today} />
                  <ErrorMessage name="fechaNacimientoMascotaDto" component="div" className="text-danger" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Peso (kg)</label>
                  <Field type="number" className="form-control" name="pesoMascotaDto" min="0" step="0.01" />
                  <ErrorMessage name="pesoMascotaDto" component="div" className="text-danger" />
                </div>

                <button type="submit" className="btn btn-dark" disabled={isSubmitting}>Registrar Mascota</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </PlantillaTres>
  );
};

export default MascotaRegistrar;
