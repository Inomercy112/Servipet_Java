import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import PlantillaDos from "../../../componentes/PlantillaDos";

const RegistroUsuarioVeterinario = () => {
  const dirigir = useNavigate();

  const [previewImage, setPreviewImage] = useState(null);

  const validationSchema = Yup.object({
    nombreUsuarioDto: Yup.string().required("Nombre de la veterinaria obligatorio."),
    imagenUsuarioDto: Yup.mixed().required("Logo de la veterinaria es obligatorio."),
    correoContactoDto: Yup.string().email("Correo de contacto no válido").required("Correo de contacto obligatorio."),
    correoUsuarioDto: Yup.string().email("Correo de inicio no válido").required("Correo de inicio obligatorio."),
    contrasenaUsuarioDto: Yup.string().min(8, "La contraseña debe tener al menos 8 caracteres.").required("Contraseña obligatoria."),
    direccionUsuarioDto: Yup.string().required("Dirección obligatoria."),
    telefonoUsuarioDto: Yup.string().matches(/^\d{10}$/, "Número de teléfono no válido").required("Teléfono obligatorio."),
    horarioAtencionDto: Yup.string().required("Horario de atención obligatorio."),
    diasDisponiblesDto: Yup.array().min(1, "Debes seleccionar al menos un día.").required("Días disponibles son obligatorios."),
  });


  const formik = useFormik({
    initialValues: {
      imagenUsuarioDto: "",
      nombreUsuarioDto: "",
      correoContactoDto: "",
      correoUsuarioDto: "",
      contrasenaUsuarioDto: "",
      direccionUsuarioDto: "",
      telefonoUsuarioDto: "",
      horarioAtencionDto: "",
      diasDisponiblesDto: [],
      rolUsuarioDto: "veterinaria",
    },
    validationSchema,
    onSubmit: async (values) => {
  
      const jsonToSend = {
        ...values,
        diasDisponiblesDto: values.diasDisponiblesDto,
      };

      try {
        const response = await fetch("http://localhost:8080/usuario/Registrar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonToSend),
        });

        if (response.ok) {
          alert("Usuario registrado exitosamente");
          dirigir("/Usuario/Consultar");
        } else {
          alert("Error al registrar el usuario");
        }
      } catch (error) {
        console.error("Error al registrar el usuario", error);
        alert("Error al registrar el usuario");
      }
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        formik.setFieldValue("imagenUsuarioDto", reader.result.split(",")[1]); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      formik.setFieldValue("diasDisponiblesDto", [...formik.values.diasDisponiblesDto, value]);
    } else {
      formik.setFieldValue("diasDisponiblesDto", formik.values.diasDisponiblesDto.filter((dia) => dia !== value));
    }
  };

  return (
    <PlantillaDos>
      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card2 shadow p-4">
              <h2 className="mb-4">Registro de Usuario Veterinario</h2>
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="nombreUsuarioDto" className="form-label">Nombre de la veterinaria:</label>
                  <input
                    type="text"
                    id="nombreUsuarioDto"
                    name="nombreUsuarioDto"
                    className="form-control"
                    onChange={formik.handleChange}
                    value={formik.values.nombreUsuarioDto}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.nombreUsuarioDto && formik.errors.nombreUsuarioDto && (
                    <div className="invalid-feedback">{formik.errors.nombreUsuarioDto}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="imagenUsuarioDto" className="form-label">Logo de la veterinaria:</label>
                  <input
                    type="file"
                    id="imagenUsuarioDto"
                    name="imagenUsuarioDto"
                    className="form-control"
                    onChange={handleImageChange}
                  />
                  {formik.touched.imagenUsuarioDto && formik.errors.imagenUsuarioDto && (
                    <div className="invalid-feedback">{formik.errors.imagenUsuarioDto}</div>
                  )}
                  {previewImage && <img src={previewImage} alt="Vista previa" className="mt-2" style={{ maxHeight: "100px", maxWidth: "100px" }} />}
                </div>

                <div className="mb-3">
                  <label htmlFor="correoContactoDto" className="form-label">Correo de contacto:</label>
                  <input
                    type="email"
                    id="correoContactoDto"
                    name="correoContactoDto"
                    className="form-control"
                    onChange={formik.handleChange}
                    value={formik.values.correoContactoDto}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.correoContactoDto && formik.errors.correoContactoDto && (
                    <div className="invalid-feedback">{formik.errors.correoContactoDto}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="correoUsuarioDto" className="form-label">Correo de inicio:</label>
                  <input
                    type="email"
                    id="correoUsuarioDto"
                    name="correoUsuarioDto"
                    className="form-control"
                    onChange={formik.handleChange}
                    value={formik.values.correoUsuarioDto}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.correoUsuarioDto && formik.errors.correoUsuarioDto && (
                    <div className="invalid-feedback">{formik.errors.correoUsuarioDto}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="contrasenaUsuarioDto" className="form-label">Contraseña:</label>
                  <input
                    type="password"
                    id="contrasenaUsuarioDto"
                    name="contrasenaUsuarioDto"
                    className="form-control"
                    onChange={formik.handleChange}
                    value={formik.values.contrasenaUsuarioDto}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.contrasenaUsuarioDto && formik.errors.contrasenaUsuarioDto && (
                    <div className="invalid-feedback">{formik.errors.contrasenaUsuarioDto}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="direccionUsuarioDto" className="form-label">Dirección de la veterinaria:</label>
                  <input
                    type="text"
                    id="direccionUsuarioDto"
                    name="direccionUsuarioDto"
                    className="form-control"
                    onChange={formik.handleChange}
                    value={formik.values.direccionUsuarioDto}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.direccionUsuarioDto && formik.errors.direccionUsuarioDto && (
                    <div className="invalid-feedback">{formik.errors.direccionUsuarioDto}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="telefonoUsuarioDto" className="form-label">Teléfono de contacto:</label>
                  <input
                    type="tel"
                    id="telefonoUsuarioDto"
                    name="telefonoUsuarioDto"
                    className="form-control"
                    onChange={formik.handleChange}
                    value={formik.values.telefonoUsuarioDto}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.telefonoUsuarioDto && formik.errors.telefonoUsuarioDto && (
                    <div className="invalid-feedback">{formik.errors.telefonoUsuarioDto}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="horarioAtencionDto" className="form-label">Horario de atención:</label>
                  <input
                    type="text"
                    id="horarioAtencionDto"
                    name="horarioAtencionDto"
                    className="form-control"
                    onChange={formik.handleChange}
                    value={formik.values.horarioAtencionDto}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.horarioAtencionDto && formik.errors.horarioAtencionDto && (
                    <div className="invalid-feedback">{formik.errors.horarioAtencionDto}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Días de la semana disponibles:</label>
                  <div>
                    {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((dia, index) => (
                      <div key={index} className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`checkbox-${index}`}
                          value={dia}
                          onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label" htmlFor={`checkbox-${index}`}>
                          {dia}
                        </label>
                      </div>
                    ))}
                  </div>
                  {formik.touched.diasDisponiblesDto && formik.errors.diasDisponiblesDto && (
                    <div className="invalid-feedback">{formik.errors.diasDisponiblesDto}</div>
                  )}
                </div>

                <div>
                  <button type="submit" className="btn btn-dark">Registrar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PlantillaDos>
  );
};

export default RegistroUsuarioVeterinario;

