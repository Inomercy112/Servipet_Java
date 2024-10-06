import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../AuthContext";
import PlantillaTres from "../../../componentes/PlantillaTres";
import { DatosCategoria } from "../../../consultas/DatosCategoria";
const RegistrarProducto = () => {
  const dirigir = useNavigate();
  const { token } = useAuth();
  const [Categoria, setCategoria] = useState([]);
  const [formData, setFormData] = useState({
    imagenProducto: "",
    nombreProducto: "",
    descripcionProducto: "",
    precioProducto: "",
    cantidadProducto: "",
    estado: { id: 1 },
    categorias: [],
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
            imagenProducto: base64Data,
            
          }));
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else if (options) {
      const selectedOptions = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => ({ id: option.value }));
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
  useEffect(() => {
    const CargarCategorias = async () => {
      try {
        const data = await DatosCategoria(token);
        setCategoria(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error("error al cargar las categorias");
      }
    };
    CargarCategorias();
  }, [token]);

  return (
    <PlantillaTres>
      <div className="container mt-5">
        <h1>Registro de Producto</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombreProducto" className="form-label">
              Nombre del Producto
            </label>
            <input
              type="text"
              className="form-control"
              id="nombreProducto"
              name="nombreProducto"
              required
              onChange={handleChange}
              value={formData.nombreProducto}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="descripcionProducto" className="form-label">
              Descripción del Producto
            </label>
            <textarea
              className="form-control"
              id="descripcionProducto"
              name="descripcionProducto"
              rows="3"
              required
              onChange={handleChange}
              value={formData.descripcionProducto}
            ></textarea>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="precioProducto" className="form-label">
                Precio
              </label>
              <input
                type="number"
                className="form-control"
                id="precioProducto"
                name="precioProducto"
                min="0"
                step="0.01"
                required
                onChange={handleChange}
                value={formData.precioProducto}
              />
            </div>
            <div className="col">
              <label htmlFor="cantidadProducto" className="form-label">
                Cantidad
              </label>
              <input
                type="number"
                className="form-control"
                id="cantidadProducto"
                name="cantidadProducto"
                min="0"
                required
                onChange={handleChange}
                value={formData.cantidadProducto}
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="categorias" className="form-label">
              Categoría
            </label>
            <select
              className="form-select"
              id="categorias"
              name="categorias"
              multiple
              onChange={handleChange}
              required
            >
              <option value="" disabled defaultValue>
                Selecciona una o más categorías
              </option>
              {Categoria.map((categorias) => (
                <option key={categorias.id} value={categorias.id}>
                  {categorias.nombreCategoria}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="imagenProducto" className="form-label">
              Imagen del Producto
            </label>
            <input
              type="file"
              className="form-control"
              id="imagenProducto"
              name="imagenProducto"
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
    </PlantillaTres>
  );
};
export default RegistrarProducto;
