import React, { useState } from "react";
import PlantillaCuatro from "../../../componentes/PlantillaCuatro";

const OpcionesEntrega = () => {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState("");

  const manejarCambio = (e) => {
    setOpcionSeleccionada(e.target.value);
  };

  const manejarContinuar = () => {
    if (!opcionSeleccionada) {
      alert("Por favor selecciona una opción de entrega.");
      return;
    }
    alert(`Opción seleccionada: ${opcionSeleccionada}`);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Elige la forma de entrega</h2>
      <form>
        <div className="form-check">
          <input
            type="radio"
            id="domicilio"
            name="entrega"
            value="Enviar a domicilio"
            className="form-check-input"
            onChange={manejarCambio}
          />
          <label htmlFor="domicilio" className="form-check-label">
            Enviar a domicilio
          </label>
          <p className="text-muted ms-4">Gratis</p>
        </div>
       
        <div className="form-check">
          <input
            type="radio"
            id="domicilioVendedor"
            name="entrega"
            value="Retirar en el domicilio del vendedor"
            className="form-check-input"
            onChange={manejarCambio}
          />
          <label htmlFor="domicilioVendedor" className="form-check-label">
            Retirar en el domicilio del vendedor
          </label>
          <p className="text-muted ms-4">Gratis</p>
        </div>
        <button
          type="button"
          className="btn btn-primary mt-4"
          onClick={manejarContinuar}
        >
          Continuar
        </button>
      </form>
    </div>
  );
};

export default OpcionesEntrega;
