import React, { useState } from "react";

import PlantillaCuatro from "../../../componentes/PlantillaCuatro";

const CorreoRecordar = () => {
  const [email, setEmail] = useState('');


  const EnviarCorreo = async (e) => {
    e.preventDefault(); // Prevenir que el formulario se envíe de manera predeterminada
    try {
      const response = await fetch('http://localhost:8080/mail/forgot', {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email }), // Asegúrate de enviar el correo en formato adecuado
      });

      if (!response.ok) {
        alert("Correo no asociado a alguna cuenta");
      } else {
        alert("Correo enviado exitosamente. Por favor revisa tu bandeja de entrada.");
      }
    } catch (e) {
      alert("Error al enviar el correo: " + e);
    }
  };

  return (
    <PlantillaCuatro title="Recordar Correo">
      <div className="container mt-7">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card2 shadow p-4">
              <h2 className="mb-4 text-center">Recupera tu contraseña</h2>
              <form onSubmit={EnviarCorreo}>
                <div className="mb-3">
                  <label htmlFor="InputEmail" className="form-label">
                    Introduce tu correo electrónico para buscar tu cuenta:
                  </label>
                  <input
                    type="email"
                    id="InputEmail"
                    name="correoUsuario"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Corregir onChange
                    required
                  />
                </div>
                <button type="submit" className="btn btn-dark">
                  Buscar cuenta
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PlantillaCuatro>
  );
};

export default CorreoRecordar;
