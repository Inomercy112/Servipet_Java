import React from "react";
import PlantillaTres from "../../../componentes/PlantillaTres";
function MascotaRegistrar(){

 return (
<PlantillaTres title='Registro Mascota'>
<body>
  <div className="container mt-5">
    <h1>Registro de Mascota</h1>
    <form >
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">Nombre de la Mascota</label>
        <input type="text" className="form-control" id="nombre" name="nombre" required/>
      </div>
      <div className="mb-3">
        <label htmlFor="tipo" className="form-label">Tipo de Mascota</label>
        <select className="form-select" id="tipo" name="tipo" required>
          <option value="">Selecciona el tipo de mascota</option>
          <option value="Perro">Perro</option>
          <option value="Gato">Gato</option>
          <option value="Ave">Ave</option>
          <option value="Roedor">Roedor</option>
          <option value="Reptil">Reptil</option>
          <option value="Otro">Otro</option>
        </select>
      </div>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="edad" className="form-label">Edad</label>
          <input type="number" className="form-control" id="edad" name="edad" min="0" required/>
        </div>
        <div className="col">
          <label htmlFor="raza" className="form-label">Raza</label>
          <input type="text" className="form-control" id="raza" name="raza"/>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="peso" className="form-label">Peso kg</label>
          <input type="number" className="form-control" id="peso" name="peso" min="0" step="0.01" required/>
        </div>
        <div className="col">
          <label htmlFor="antecedentes" className="form-label">Antecedentes</label>
          <textarea className="form-control" id="antecedentes" name="antecedentes" rows="3"></textarea>
        </div>
      </div>
      <button type="submit" className="btn btn-dark">Registrar Mascota</button>
    </form>
  </div>
  
</body>
</PlantillaTres>
  );
}
export default MascotaRegistrar;
