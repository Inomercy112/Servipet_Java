import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../../../componentes/Footer";
import { useAuth } from "../../../context/AuthContext";

function ContrasenaRecordar() {

    return ( 
        <div className="container mt-7">
        <div className="row justify-content-center">
          <div className="col-md-8"> 
            <div className="card2 shadow p-4">
              <h2 className="mb-4 text-center">Recupera tu contraseña</h2>
              <form onSubmit={handleSubmit}>
              <div className="mb-3">
                  <label htmlFor="contrasenaUsuarioDto" className="form-label">
                
                Nueva contraseña:
                  </label>
                  <input
                    type="password"
                    id="contrasenaUsuarioDto"
                    name="contrasenaUsuarioDto"
                    className={`form-control ${
                      errors.contrasenaUsuarioDto ? "is-invalid" : ""
                    }`}
                    value={formData.contrasenaUsuarioDto}
                    onChange={handleChange}
                  />
                  {errors.contrasenaUsuarioDto && (
                    <div className="invalid-feedback">
                      <strong>{errors.contrasenaUsuarioDto}</strong>
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="confirmarContrasena"
                    className="form-label"
                  >
                    Confirmar Contraseña:
                  </label>
                  <input
                    type="password"
                    id="confirmarContrasena"
                    name="confirmarContrasena"
                    className={`form-control ${
                      errors.confirmarContrasena ? "is-invalid" : ""
                    }`}
                    value={formData.confirmarContrasena}
                    onChange={handleChange}
                  />
                  {errors.confirmarContrasena && (
                    <div className="invalid-feedback">
                      <strong>{errors.confirmarContrasena}</strong>
                    </div>
                  )}
                </div>
                <button type="submit" className="btn btn-dark">
                  Recuperar contraseña
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
    }