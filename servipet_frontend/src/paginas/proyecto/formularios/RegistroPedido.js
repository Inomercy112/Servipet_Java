import { useFormik } from "formik";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import PlantillaCuatro from "../../../componentes/PlantillaCuatro";
import { useAuth } from "../../../context/AuthContext";
const backendUrl = process.env.REACT_APP_BACKEND_URL;


const RegistroPedido = () => {
  const { token } = useAuth();
  const location = useLocation();
  const navegar = useNavigate();
  const from = location.state?.from || "/";

  const [sinNumero, setSinNumero] = useState(false);

  const formik = useFormik({
    initialValues: {
      duenoDomicilioDto: localStorage["id"],
      nombreDto: "",
      localidadDto: "",
      barrioDto: "",
      tipoCalle: "",
      calle: "",
      numero: "",
      telefonoDto: "",
      pisoDepartamentoDto: "",
      casaOTrabajoDto: "",
      adicionalesDto: "",
    },
    validationSchema: Yup.object({
      nombreDto: Yup.string()
        .min(4, "Debe tener al menos 4 caracteres")
        .max(30, "No puede superar los 30 caracteres")
        .matches(/^(?!.*(.)\1{3,}).*$/, "No puede contener más de 3 caracteres repetidos consecutivos")
        .required("Este campo es obligatorio"),
      localidadDto: Yup.string().required("Campo obligatorio"),
      barrioDto: Yup.string().required("Campo obligatorio"),
      tipoCalle: Yup.string().required("Campo obligatorio"),
      calle: Yup.string().required("Campo obligatorio"),
      numero: Yup.string()
        .when("sinNumero", {
          is: false,
          then: (schema) => schema.required("Debe ingresar un número"),
        }),
      telefonoDto: Yup.string()
        .matches(/^\d{10}$/, "Debe tener exactamente 10 dígitos")
        .required("Campo obligatorio"),
      pisoDepartamentoDto: Yup.string()
        .min(4, "Debe tener al menos 4 caracteres")
        .max(100, "No puede superar los 100 caracteres")
        .required("Campo obligatorio"),
      adicionalesDto: Yup.string().max(100, "Máximo 100 caracteres"),
    }),
    onSubmit: async (values) => {
      const direccion = `${values.tipoCalle} ${values.calle} ${sinNumero ? "(sin número)" : `#${values.numero}`}`;

      const dataToSend = {
        ...values,
        direccionDto: direccion,
      };

      try {
        const response = await fetch(`${backendUrl}/datosDomicilio/Registrar`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dataToSend),
        });

        if (response.ok) {
          navegar(from, { replace: true });
        }
      } catch (e) {
        console.log("Error al realizar el registro", e);
      }
    },
  });

  return (
    <PlantillaCuatro>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card2 shadow p-4">
              <h2>Agregar domicilio</h2>
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nombre y apellido</label>
                  <input
                    type="text"
                    className="form-control"
                    {...formik.getFieldProps("nombreDto")}
                  />
                  {formik.touched.nombreDto && formik.errors.nombreDto && (
                    <div className="text-danger">{formik.errors.nombreDto}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Localidad</label>
                  <input
                    type="text"
                    className="form-control"
                    {...formik.getFieldProps("localidadDto")}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Barrio</label>
                  <input
                    type="text"
                    className="form-control"
                    {...formik.getFieldProps("barrioDto")}
                  />
                </div>

                <div className="row mb-3">
                  <div className="col-md-3">
                    <label className="form-label">Tipo de calle</label>
                    <input type="text" className="form-control" {...formik.getFieldProps("tipoCalle")} />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Calle</label>
                    <input type="text" className="form-control" {...formik.getFieldProps("calle")} />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Número</label>
                    <input
                      type="text"
                      className="form-control"
                      disabled={sinNumero}
                      {...formik.getFieldProps("numero")}
                    />
                  </div>
                  <div className="col-md-3 d-flex align-items-center">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="sinNumero"
                      checked={sinNumero}
                      onChange={(e) => setSinNumero(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="sinNumero">
                      No tengo número
                    </label>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Teléfono de contacto</label>
                  <input type="text" className="form-control" {...formik.getFieldProps("telefonoDto")} />
                  {formik.touched.telefonoDto && formik.errors.telefonoDto && (
                    <div className="text-danger">{formik.errors.telefonoDto}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Piso/Departamento</label>
                  <input type="text" className="form-control" {...formik.getFieldProps("pisoDepartamentoDto")} />
                </div>

                <div className="mb-3">
                  <label className="form-label">Referencias adicionales</label>
                  <textarea
                    className="form-control"
                    {...formik.getFieldProps("adicionalesDto")}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">
                  Continuar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PlantillaCuatro>
  );
};

export default RegistroPedido;
