import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PlantillaTres from "../../../componentes/PlantillaTres";
import { useAuth } from "../../../context/AuthContext";
import { CategoriaContext } from "../../../context/CategoriaContext";
const RegistrarProducto = () => {
  const dirigir = useNavigate();
  const { token } = useAuth();
  const {categoria} = useContext(CategoriaContext);

  const [formData, setFormData] = useState({
    imagenProductoDto: "",
    nombreProductoDto: "",
    descripcionProductoDto: "",
    duenoProductoDto: localStorage['id'],
    precioProductoDto: "",
    cantidadProductoDto: "",

    categoriasNombresDto: [],
  });
  const [previewImage, setPreviewImage] = useState([]);
  
  
  const handleChange = (e) => {
    const { name, value, options, files, type } = e.target;
  
    if (type === "file") {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Data = reader.result.split(',')[1];
          setFormData((prevState) => ({
            ...prevState,
            imagenProductoDto: base64Data,
            
          }));
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else if (options) {
      const selectedOptions = Array.from(options)
        .filter((option) => option.selected)
        .map((option) =>  option.value );
      setFormData((prevState) => ({
        ...prevState,
        [name]: selectedOptions,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/producto/Registrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("El producto fue registrado");
        dirigir("/Producto/Consultar");
      } else {
        alert("ocurrio un problema");
      }
    } catch (error) {
      console.error("ocurrio un problema con el servidor", error);
    }
  };
  
  return (
    <PlantillaTres>
      <div className="container mt-5">
      <div className="card2 shadow p-4">

        <h1>Registro de Producto</h1>
        <form onSubmit={handleSubmit}>
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
              onChange={handleChange}
              value={formData.nombreProductoDto}
            />
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
              onChange={handleChange}
              value={formData.descripcionProductoDto}
            ></textarea>
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
                onChange={handleChange}
                value={formData.precioProductoDto}
              />
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
                onChange={handleChange}
                value={formData.cantidadProductoDto}
              />
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
              onChange={handleChange}
              required
            >
              <option value="" disabled defaultValue>
                Selecciona una o más categorías
              </option>
              {categoria.map((categorias) => (
                <option key={categorias.idDto} value={categorias.nombreCategoriaDto}>
                  {categorias.nombreCategoriaDto}
                </option>
              ))}
            </select>
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
              onChange={handleChange}
            />
          </div>
          {previewImage && (
            <div className="mb-3">
              
              <img
                src={previewImage}
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
