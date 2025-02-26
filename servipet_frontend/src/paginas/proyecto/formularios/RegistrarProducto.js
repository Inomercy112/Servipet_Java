import { Form, Formik } from "formik";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import PlantillaTres from "../../../componentes/PlantillaTres";
import { useAuth } from "../../../context/AuthContext";
import { CategoriaContext } from "../../../context/CategoriaContext";
import { CustomFileInput, CustomInput, CustomSelect, CustomTextarea } from "./CustomInputs/CustomInputs";

const validationSchema = Yup.object().shape({
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

  imagenProductoDto: Yup.string().required("La imagen del producto es obligatoria."),
});

const RegistrarProducto = () => {
  const dirigir = useNavigate();
  const { token } = useAuth();
  const { categoria } = useContext(CategoriaContext);

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(values);
    try {
      const response = await fetch("http://localhost:8080/producto/Registrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values), // Enviar solo un objeto, no un array
      });

      if (response.ok) {
        alert("Producto registrado con éxito.");
        dirigir("/Producto/Consultar");
      } else {
        alert("Error al registrar el producto.");
      }
    } catch (error) {
      console.error("Error con el servidor:", error);
      alert("Ocurrió un error inesperado.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PlantillaTres>
      <div className="container mt-5">
        <div className="card2 shadow p-4">
          <h1>Registro de Producto</h1>
          <Formik
            initialValues={{
              nombreProductoDto: "",
              descripcionProductoDto: "",
              precioProductoDto: "",
              duenoProductoDto: localStorage["id"],
              cantidadProductoDto: "",
              categoriasNombresDto: [],
              imagenProductoDto: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue, values, errors, touched }) => {
              console.log("Valores actuales:", values);
              console.log("Errores actuales:", errors);
              return (
                <Form>
                  <CustomInput name="nombreProductoDto" label="Nombre del Producto" />
                  <CustomTextarea name="descripcionProductoDto" label="Descripción" />
                  <CustomInput name="precioProductoDto" label="Precio" type="number" />
                  <CustomInput name="cantidadProductoDto" label="Cantidad" type="number" />
                  <CustomSelect name="categoriasNombresDto" label="Categoría" options={categoria || []} multiple />
                  <CustomFileInput setFieldValue={setFieldValue} />

                  <button type="submit" className="btn btn-dark mt-3" disabled={isSubmitting}>
                    {isSubmitting ? "Registrando..." : "Registrar Producto"}
                  </button>
                </Form>
              );
            }}
          </Formik>


        </div>
      </div>
    </PlantillaTres>
  );
};

export default RegistrarProducto;
