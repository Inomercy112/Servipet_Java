import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import PlantillaTres from "../../../componentes/PlantillaTres";
import { DatosTipo } from '../../../consultas/DatosTipo';
import { useAuth } from '../../../context/AuthContext';

const today = new Date().toISOString().split("T")[0];

const MascotaRegistrar = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [tipo, setTipo] = useState([]);

  // Esquema de validación con Yup
  const validationSchema = Yup.object().shape({
    nombreMascotaDto: Yup.string()
    .matches(
      "^(?!([a-zA-Z0-9])\\1{2,}$).{6,20}$",
      "El nombre de la mascota no puede tener más de 2 caracteres consecutivos iguales"
    )
    .required("El nombre de la mascota es obligatorio"),
    tipoMascotaDto: Yup.object().shape({
      idDto: Yup.string().required("El tipo de mascota es obligatorio"),
    }),
    fechaNacimientoMascotaDto: Yup.date()
      .max(today, "La fecha de nacimiento no puede ser futura")
      .required("La fecha de nacimiento es obligatoria"),
    razaMascotaDto: Yup.string().required("La raza es obligatoria"),
    pesoMascotaDto: Yup.number()
      .min(0, "El peso no puede ser negativo")
      .max(100, "no puede ser mayor de 100 kilos el peso")
      .required("El peso es obligatorio"),
    tamanoMascotaDto: Yup.object().shape({
      idDto: Yup.string().required("El tamaño de la mascota es obligatorio"),
    }),
  });

  // Estado inicial del formulario
  const initialValues = {
    nombreMascotaDto: "",
    fechaNacimientoMascotaDto: "",
    duenoMascotaDto: localStorage["id"],
    antecedentesMascotaDto: "",
    tipoMascotaDto: { idDto: "" },
    razaMascotaDto: "",
    pesoMascotaDto: "",
    tamanoMascotaDto: { idDto: "" },
    estadoMascotaDto: 1,
  };

  // Función para enviar el formulario
  const handleSubmit = async (values) => {
    try {
      const response = await fetch("http://localhost:8080/mascota/Registrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        alert("Mascota registrada!");
        navigate("/Mascota/Consultar");
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      alert("Ocurrió un error inesperado");
    }
  };

  // Cargar tipos de mascota
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
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form id="registroMascota">
                <div className="mb-3">
                  <label htmlFor="nombreMascotaDto" className="form-label">
                    Nombre de la Mascota
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="nombreMascotaDto"
                    name="nombreMascotaDto"
                  />
                  <ErrorMessage
                    name="nombreMascotaDto"
                    component="span"
                    className="text-danger"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="tipoMascotaDto.idDto" className="form-label">
                    Tipo de Mascota
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    id="tipoMascotaDto.idDto"
                    name="tipoMascotaDto.idDto"
                  >
                    <option value="">Selecciona el tipo de mascota</option>
                    {tipo.map((tipos) => (
                      <option key={tipos.id} value={tipos.id}>
                        {tipos.nombreTipo}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="tipoMascotaDto.idDto"
                    component="span"
                    className="text-danger"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="tamanoMascotaDto.idDto" className="form-label">
                    Tamaño de mascota
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    id="tamanoMascotaDto.idDto"
                    name="tamanoMascotaDto.idDto"
                  >
                    <option value="">Selecciona el tamaño de tu mascota</option>
                    <option value="1">Grande</option>
                    <option value="2">Mediano</option>
                    <option value="3">Pequeño</option>
                  </Field>
                  <ErrorMessage
                    name="tamanoMascotaDto.idDto"
                    component="span"
                    className="text-danger"
                  />
                </div>

                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="fechaNacimientoMascotaDto" className="form-label">
                      Fecha de nacimiento
                    </label>
                    <Field
                      type="date"
                      className="form-control"
                      id="fechaNacimientoMascotaDto"
                      name="fechaNacimientoMascotaDto"
                      max={today}
                    />
                    <ErrorMessage
                      name="fechaNacimientoMascotaDto"
                      component="span"
                      className="text-danger"
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="razaMascotaDto" className="form-label">
                      Raza
                    </label>
                    <Field
                      type="text"
                      className="form-control"
                      id="razaMascotaDto"
                      name="razaMascotaDto"
                    />
                    <ErrorMessage
                      name="razaMascotaDto"
                      component="span"
                      className="text-danger"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="pesoMascotaDto" className="form-label">
                      Peso (kg)
                    </label>
                    <Field
                      type="number"
                      className="form-control"
                      id="pesoMascotaDto"
                      name="pesoMascotaDto"
                      min="0"
                      step="0.01"
                    />
                    <ErrorMessage
                      name="pesoMascotaDto"
                      component="span"
                      className="text-danger"
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="antecedentesMascotaDto" className="form-label">
                      Antecedentes
                    </label>
                    <Field
                      as="textarea"
                      className="form-control"
                      id="antecedentesMascotaDto"
                      name="antecedentesMascotaDto"
                      rows="3"
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-dark">
                  Registrar Mascota
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