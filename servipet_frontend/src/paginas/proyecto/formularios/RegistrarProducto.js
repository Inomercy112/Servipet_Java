import React from "react";
import PlantillaTres from "../../../componentes/PlantillaTres";

const RegistrarProducto =() => {
return (
  <PlantillaTres>
  
  <div className="container mt-5">
    <h1>Registro de Producto</h1>
    <form action="../Error/500.html">
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">Nombre del Producto</label>
        <input type="text" className="form-control" id="nombre" name="nombre" required/>
      </div>
      <div className="mb-3">
        <label htmlFor="descripcion" className="form-label">Descripción del Producto</label>
        <textarea className="form-control" id="descripcion" name="descripcion" rows="3" required></textarea>
      </div>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="precio" className="form-label">Precio</label>
          <input type="number" className="form-control" id="precio" name="precio" min="0" step="0.01" required/>
        </div>
        <div className="col">
          <label htmlFor="cantidad" className="form-label">Cantidad</label>
          <input type="number" className="form-control" id="cantidad" name="cantidad" min="0" required/>
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="categoria" className="form-label">Categoría</label>
        <select className="form-select" id="categoria" name="categoria" required>
          <option value="">Selecciona una categoría</option>
          <option value="Secos">Secos</option>
          <option value="Humedos">Húmedos</option>
          <option value="Belleza/Higiene">Belleza/Higiene</option>
          <option value="Juguetes">Juguetes</option>

        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="imagen" className="form-label">Imagen del Producto</label>
        <input type="file" className="form-control" id="imagen" name="imagen" accept="image/*" required/>
      </div>
      <button type="submit" className="btn btn-dark">Registrar Producto</button>
    </form>
  </div>

</PlantillaTres>


)
}
export default RegistrarProducto;