import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PlantillaTres from "../../../componentes/PlantillaTres";
import { useAuth } from "../../../context/AuthContext";
import { CategoriaContext } from "../../../context/CategoriaContext";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB en bytes

const validationSchema = Yup.object().shape({
  productos: Yup.array().of(
    Yup.object().shape({
      nombreProductoDto: Yup.string()
        .min(10, "Debe tener al menos 10 caracteres")
        .max(50, "No puede superar los 50 caracteres")
        .matches(/^(?!.*(.)\1{3,})/, "No más de 3 caracteres repetidos seguidos")
        .required("El nombre del producto es obligatorio."),
      
      descripcionProductoDto: Yup.string()
        .min(30, "Debe tener al menos 30 caracteres")
        .max(200, "No puede superar los 200 caracteres")
        .matches(/^(?!.*(.)\1{3,})/, "No más de 3 caracteres repetidos seguidos")
        .required("La descripción del producto es obligatoria."),
      
     precioProductoDto: Yup.number()
  .min(1000, "El precio mínimo es 1000")
  .max(1000000, "El precio máximo es 1000000")
  .test("es-par-multiplo-50", "El precio debe ser un número par y múltiplo de 50.", (value) => value % 50 === 0)
  .required("El precio es obligatorio."),

      cantidadProductoDto: Yup.number()
        .min(1, "Debe ser al menos 1")
        .max(150, "No puede ser mayor a 150")
        .required("La cantidad es obligatoria."),
      
      categoriasNombresDto: Yup.array()
        .min(1, "Selecciona al menos una categoría.")
        .required("Las categorías son obligatorias."),
      
      imagenProductoDto: Yup.string()
        .required("La imagen del producto es obligatoria."),
    })
  ),
});

const RegistrarProducto = () => {
  const dirigir = useNavigate();
  const { token } = useAuth();
  const { categoria } = useContext(CategoriaContext);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch("http://localhost:8080/producto/Registrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values.productos),
      });

      if (response.ok) {
        alert("Productos registrados con éxito.");
        dirigir("/Producto/Consultar");
      } else {
        alert("Error al registrar los productos.");
      }
    } catch (error) {
      console.error("Error con el servidor:", error);
      alert("Ocurrió un error inesperado.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageChange = (event, setFieldValue, index) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > MAX_IMAGE_SIZE) {
        alert("El archivo no puede superar los 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFieldValue(`productos[${index}].imagenProductoDto`, reader.result.split(',')[1]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <PlantillaTres>
      <div className="container mt-5">
        <div className="card2 shadow p-4">
          <h1>Registro de Productos</h1>
          <Formik
            initialValues={{
              productos: [
                {
                  nombreProductoDto: "",
                  descripcionProductoDto: "",
                  duenoProductoDto: localStorage["id"],
                  precioProductoDto: "",
                  cantidadProductoDto: "",
                  categoriasNombresDto: [],
                  imagenProductoDto: "",
                },
              ],
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, isSubmitting, setFieldValue }) => (
              <Form>
                <FieldArray name="productos">
                  {({ push, remove }) => (
                    <>
                      {values.productos.map((_, index) => (
                        <div key={index} className="mb-4 border p-3 rounded">
                          <h5>Producto {index + 1}</h5>

                          <div className="mb-3">
                            <label className="form-label">Nombre del Producto</label>
                            <Field type="text" className="form-control" name={`productos[${index}].nombreProductoDto`} />
                            <ErrorMessage name={`productos[${index}].nombreProductoDto`} component="div" className="text-danger" />
                          </div>

                          <div className="mb-3">
                            <label className="form-label">Descripción</label>
                            <Field as="textarea" className="form-control" name={`productos[${index}].descripcionProductoDto`} rows="3" />
                            <ErrorMessage name={`productos[${index}].descripcionProductoDto`} component="div" className="text-danger" />
                          </div>

                          <div className="row mb-3">
                            <div className="col">
                              <label className="form-label">Precio</label>
                              <Field type="number" className="form-control" name={`productos[${index}].precioProductoDto`} />
                              <ErrorMessage name={`productos[${index}].precioProductoDto`} component="div" className="text-danger" />
                            </div>
                            <div className="col">
                              <label className="form-label">Cantidad</label>
                              <Field type="number" className="form-control" name={`productos[${index}].cantidadProductoDto`} />
                              <ErrorMessage name={`productos[${index}].cantidadProductoDto`} component="div" className="text-danger" />
                            </div>
                          </div>

                          <div className="mb-3">
                            <label className="form-label">Categoría</label>
                            <Field as="select" className="form-select" name={`productos[${index}].categoriasNombresDto`} multiple>
                              {categoria.map((c) => (
                                <option key={c.idDto} value={c.nombreCategoriaDto}>{c.nombreCategoriaDto}</option>
                              ))}
                            </Field>
                            <ErrorMessage name={`productos[${index}].categoriasNombresDto`} component="div" className="text-danger" />
                          </div>

                          <div className="mb-3">
                            <label className="form-label">Imagen del Producto</label>
                            <input type="file" className="form-control" accept="image/*" onChange={(e) => handleImageChange(e, setFieldValue, index)} />
                            <ErrorMessage name={`productos[${index}].imagenProductoDto`} component="div" className="text-danger" />
                          </div>

                          <button type="button" className="btn btn-danger" onClick={() => remove(index)}>Eliminar Producto</button>
                        </div>
                      ))}
                      <button type="button" className="btn btn-primary mt-3" onClick={() => push({
                        nombreProductoDto: "",
                        descripcionProductoDto: "",
                        precioProductoDto: "",
                        cantidadProductoDto: "",
                        categoriasNombresDto: [],
                        imagenProductoDto: "",
                      })}>+ Agregar otro producto</button>
                    </>
                  )}
                </FieldArray>

                <button type="submit" className="btn btn-dark mt-3" disabled={isSubmitting}>
                  {isSubmitting ? "Registrando..." : "Registrar Productos"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </PlantillaTres>
  );
};

export default RegistrarProducto;
