import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PlantillaTres from "../../../componentes/PlantillaTres";
import { useAuth } from "../../../context/AuthContext";
import { CategoriaContext } from "../../../context/CategoriaContext";
import { useFormik } from "formik";
import * as Yup from "yup";

const RegistrarProducto = () => {
  const dirigir = useNavigate();
  const { token } = useAuth();
  const { categoria } = useContext(CategoriaContext);

  const formik = useFormik({
    initialValues: {
      imagenProductoDto: "",
      nombreProductoDto: "",
      descripcionProductoDto: "",
      duenoProductoDto: localStorage["id"],
      precioProductoDto: "",
      cantidadProductoDto: "",
      categoriasNombresDto: [],
    },
    validationSchema: Yup.object({
      nombreProductoDto: Yup.string().required("El nombre del producto es obligatorio."),
      descripcionProductoDto: Yup.string().required("La descripción del producto es obligatoria."),
      precioProductoDto: Yup.number().positive("El precio debe ser positivo.").required("El precio es obligatorio."),
      cantidadProductoDto: Yup.number().integer("La cantidad debe ser un número entero.").min(0, "La cantidad no puede ser negativa.").required("La cantidad es obligatoria."),
      categoriasNombresDto: Yup.array().min(1, "Selecciona al menos una categoría.").required("Las categorías son obligatorias."),
      imagenProductoDto: Yup.string().required("La imagen del producto es obligatoria."),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch("http://localhost:8080/producto/Registrar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          alert("El producto fue registrado con éxito.");
          dirigir("/Producto/Consultar");
        } else {
          alert("Ocurrió un problema al registrar el producto.");
        }
      } catch (error) {
        console.error("Error con el servidor:", error);
        alert("Error con el servidor.");
      }
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formik.setFieldValue("imagenProductoDto", reader.result.split(',')[1]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    formik.setFieldValue("categoriasNombresDto", selectedOptions);
  };

  return (
    <PlantillaTres>
      <div className="container mt-5">
        <div className="card2 shadow p-4">
          <h1>Registro de Producto</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nombreProductoDto" className="form-label">
                Nombre del Producto
              </label>
              <input
                type="text"
                className="form-control"
                id="nombreProductoDto"
                name="nombreProductoDto"
                required
                onChange={formik.handleChange}
                value={formik.values.nombreProductoDto}
              />
              {formik.touched.nombreProductoDto && formik.errors.nombreProductoDto && (
                <div className="text-danger">{formik.errors.nombreProductoDto}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="descripcionProductoDto" className="form-label">
                Descripción del Producto
              </label>
              <textarea
                className="form-control"
                id="descripcionProductoDto"
                name="descripcionProductoDto"
                rows="3"
                required
                onChange={formik.handleChange}
                value={formik.values.descripcionProductoDto}
              />
              {formik.touched.descripcionProductoDto && formik.errors.descripcionProductoDto && (
                <div className="text-danger">{formik.errors.descripcionProductoDto}</div>
              )}
            </div>

            <div className="row mb-3">
              <div className="col">
                <label htmlFor="precioProductoDto" className="form-label">
                  Precio
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="precioProductoDto"
                  name="precioProductoDto"
                  min="0"
                  step="0.01"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.precioProductoDto}
                />
                {formik.touched.precioProductoDto && formik.errors.precioProductoDto && (
                  <div className="text-danger">{formik.errors.precioProductoDto}</div>
                )}
              </div>

              <div className="col">
                <label htmlFor="cantidadProductoDto" className="form-label">
                  Cantidad
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="cantidadProductoDto"
                  name="cantidadProductoDto"
                  min="0"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.cantidadProductoDto}
                />
                {formik.touched.cantidadProductoDto && formik.errors.cantidadProductoDto && (
                  <div className="text-danger">{formik.errors.cantidadProductoDto}</div>
                )}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="categoriasDto" className="form-label">
                Categoría
              </label>
              <select
                className="form-select"
                id="categoriasDto"
                name="categoriasNombresDto"
                multiple
                required
                onChange={handleCategoryChange}
                value={formik.values.categoriasNombresDto}
              >
                <option value="" disabled>
                  Selecciona una o más categorías
                </option>
                {categoria.map((categorias) => (
                  <option key={categorias.idDto} value={categorias.nombreCategoriaDto}>
                    {categorias.nombreCategoriaDto}
                  </option>
                ))}
              </select>
              {formik.touched.categoriasNombresDto && formik.errors.categoriasNombresDto && (
                <div className="text-danger">{formik.errors.categoriasNombresDto}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="imagenProductoDto" className="form-label">
                Imagen del Producto
              </label>
              <input
                type="file"
                className="form-control"
                id="imagenProductoDto"
                name="imagenProductoDto"
                accept="image/*"
                required
                onChange={handleImageChange}
              />
              {formik.touched.imagenProductoDto && formik.errors.imagenProductoDto && (
                <div className="text-danger">{formik.errors.imagenProductoDto}</div>
              )}
            </div>

            {formik.values.imagenProductoDto && (
              <div className="mb-3">
                <img
                  src={`data:image/png;base64,${formik.values.imagenProductoDto}`}
                  alt="Vista previa"
                  style={{ width: "200px", height: "auto" }}
                />
              </div>
            )}

            <button type="submit" className="btn btn-dark">
              Registrar Producto
            </button>
          </form>
        </div>
      </div>
    </PlantillaTres>
  );
};

export default RegistrarProducto;

