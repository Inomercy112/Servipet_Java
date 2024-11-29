import React from "react";
import PlantillaCuatro from "../../../componentes/PlantillaCuatro";
const RegistroPedido = () => {
  return (
    <PlantillaCuatro>
                

      <div className="container mt-5">
    <div class="row container my-5">
      <div class="col-lg-8">
      <div className="card shadow p-4">
        <h2>Agregar domicilio</h2>
        <form>
          <div class="mb-3">
            <label for="nombre" class="form-label">Nombre y apellido</label>
            <input type="text" class="form-control" id="nombre" placeholder="Tal cual figure en el documento." />
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <label for="departamento" class="form-label">Departamento</label>
              <select id="departamento" class="form-select">
                <option selected>Selecciona un departamento</option>
                <option value="1">Departamento 1</option>
                <option value="2">Departamento 2</option>
                <option value="3">Departamento 3</option>
              </select>
            </div>
            <div class="col-md-6">
              <label for="ciudad" class="form-label">Municipio, capital o localidad</label>
              <input type="text" class="form-control" id="ciudad"/>
            </div>
          </div>

          <div class="mb-3">
            <label for="barrio" class="form-label">Barrio</label>
            <input type="text" class="form-control" id="barrio"/>
          </div>

          <div class="row mb-3">
            <div class="col-md-3">
              <label for="tipoCalle" class="form-label">Tipo de calle</label>
              <input type="text" class="form-control" id="tipoCalle"/>
            </div>
            <div class="col-md-3">
              <label for="calle" class="form-label">Calle</label>
              <input type="text" class="form-control" id="calle"/>
            </div>
            <div class="col-md-3">
              <label for="numero" class="form-label">Número</label>
              <input type="text" class="form-control" id="numero"/>
            </div>
            <div class="col-md-3 d-flex align-items-center">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="sinNumero"/>
                <label class="form-check-label" for="sinNumero">No tengo número</label>
              </div>
            </div>
          </div>

          <div class="mb-3">
            <label for="piso" class="form-label">Piso/Departamento (opcional)</label>
            <input type="text" class="form-control" id="piso"/>
          </div>

          <div class="mb-3">
            <label class="form-label">¿Es tu trabajo o tu casa?</label>
            <div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="domicilioTipo" id="laboral" value="Laboral"/>
                <label class="form-check-label" for="laboral">Laboral</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="domicilioTipo" id="residencial" value="Residencial" checked/>
                <label class="form-check-label" for="residencial">Residencial</label>
              </div>
            </div>
          </div>

          <div class="mb-3">
            <label for="telefono" class="form-label">Teléfono de contacto</label>
            <input type="text" class="form-control" id="telefono"/>
          </div>

          <div class="mb-3">
            <label for="referencias" class="form-label">Referencias adicionales de esta dirección</label>
            <textarea class="form-control" id="referencias" rows="3" placeholder="Descripción de la fachada, puntos de referencia para encontrarla, indicaciones de seguridad, etc."></textarea>
          </div>

          <button type="submit" class="btn btn-primary">Continuar</button>
        </form>
      </div>

      <div class="col-lg-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Resumen de compra</h5>
            <p class="card-text">Producto: <span>$289.900</span></p>
            <p class="card-text">Envío: <span>--</span></p>
            <div>
            <p class="card-text">Total: <strong>$289.900</strong></p>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
  </div>
  
  </PlantillaCuatro>
  )
}
export default RegistroPedido;
