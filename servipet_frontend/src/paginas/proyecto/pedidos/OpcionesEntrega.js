import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlantillaCuatro from "../../../componentes/PlantillaCuatro";
const OpcionesEntrega = () => {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState("");
  const navegar = useNavigate();
  const manejarCambio = (e) => {
    setOpcionSeleccionada(e.target.value);
  };

  const manejarContinuar = () => {
    if (!opcionSeleccionada) {
      alert("Por favor selecciona una opción de entrega.");
      return;
    }else{
      navegar(`/Pedido/Finalizar/${opcionSeleccionada}`);
    }
  };

  return (
    <PlantillaCuatro>


    <div className="container mt-5">
      <h2 className="mb-4">Elige la forma de entrega</h2>
      <form>
        <div className="form-check">
          <input
            type="radio"
            id="domicilio"
            name="entrega"
            value="2"
            className="form-check-input"
            onChange={manejarCambio}
          />
          <label htmlFor="domicilio" className="form-check-label">
            Enviar a domicilio
          </label>
          <p className="text-muted ms-4">$0</p>
        </div>
      
        <div className="form-check">
          <input
            type="radio"
            id="domicilioVendedor"
            name="entrega"
            value="1"
            className="form-check-input"
            onChange={manejarCambio}
          />
          <label htmlFor="domicilioVendedor" className="form-check-label">
            Retirar en el domicilio del vendedor
          </label>
          <p className="text-muted ms-4">Gratis</p>
        </div>
        <button
          className="btn btn-primary mt-4"
          onClick={manejarContinuar}
        >
          Continuar
        </button>
      </form>
    </div>
    </PlantillaCuatro>
  );
};

export default OpcionesEntrega;
