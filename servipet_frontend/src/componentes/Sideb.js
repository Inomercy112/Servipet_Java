import React, { useState, useEffect, useContext } from "react";
import { CategoriaContext } from "../context/CategoriaContext";
import { ProductoContext } from "../context/ProductoContext";
import Slider from "@mui/material/Slider";

const Sidebar = ({ onFilterChange }) => {
  const { categoria } = useContext(CategoriaContext);
  const { productos } = useContext(ProductoContext);
  const [precioMin, setPrecioMin] = useState(0);
  const [precioMax, setPrecioMax] = useState(1000);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (productos.length > 0) {
      const precios = productos.map((p) => p.precioProductoDto);
      setPrecioMin(Math.min(...precios));
      setPrecioMax(Math.max(...precios));
    }
  }, [productos]);

  const handlePriceChange = (event, newValue) => {
    setPrecioMin(newValue[0]);
    setPrecioMax(newValue[1]);
    onFilterChange({ categoria: selectedCategory, precioMin: newValue[0], precioMax: newValue[1] });
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    onFilterChange({ categoria: event.target.value, precioMin, precioMax });
  };

  return (
    <div className="sidebar p-4 border rounded shadow">
      <h4>Filtrar por</h4>
      <div className="mb-4">
        <label className="form-label">Categoría</label>
        <select className="form-select" onChange={handleCategoryChange}>
          <option value="">Todas</option>
          {categoria.map((cat) => (
            <option key={cat.idDto} value={cat.nombreCategoriaDto}>{cat.nombreCategoriaDto}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="form-label">Rango de precios</label>
        <Slider
          value={[precioMin, precioMax]}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
        />
        <div className="d-flex justify-content-between">
          <span>${precioMin}</span>
          <span>${precioMax}</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
