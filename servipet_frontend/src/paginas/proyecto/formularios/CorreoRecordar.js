import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../../../componentes/Footer";
import { useAuth } from "../../../context/AuthContext";

function CorreoRecordar() {




return ( 
    <div className="container mt-7">
    <div className="row justify-content-center">
      <div className="col-md-8"> 
        <div className="card2 shadow p-4">
          <h2 className="mb-4 text-center">Recupera tu contraseña</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="InputEmail" className="form-label">
                Introduce tu correo electrónico para buscar tu cuenta:
              </label>
              <input
                type="email"
                id="InputEmail"
                name="correoUsuario"
                className="form-control"
                value={formData.correoUsuario}
                onChange={handleChange}
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
);
}

