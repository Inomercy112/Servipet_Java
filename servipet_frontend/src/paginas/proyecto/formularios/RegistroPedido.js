import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlantillaCuatro from "../../../componentes/PlantillaCuatro";
import { useAuth } from "../../../context/AuthContext";
import { useCarrito } from "../../../context/CarritoContext";


const RegistroPedido = () => {
  const navegar = useNavigate();
  const { token } = useAuth();
  const [sinNumero, setSinNumero] = useState(false);
  const [tipoCalle, setTipoCalle] = useState('');
  const [calle, setCalle] = useState('');
  const [numero, setNumero] = useState('');
  const { carrito } = useCarrito();
  const [costoEnvio, setCostoEnvio] = useState(0);


  const [formData, setFormData] = useState({
    duenoDomicilioDto: localStorage["id"],
    nombreDto: "",
    localidadDto: "",
    barrioDto: "",
    direccionDto: "",
    telefonoDto: "",
    pisoDepartamentoDto: "",
    casaOTrabajoDto: "",
    adicionalesDto: "",
  });
  const costoProducto = carrito.reduce(
    (sum, producto) => sum + producto.precioProductoDto,
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    setSinNumero(e.target.checked);
  };

  const RegistrarDatosDomicilio = async (e) => {

    e.preventDefault();
    const direccion = `${tipoCalle} ${calle} ${sinNumero ? "(sin numero)" : `#${numero}`}`
    const dataTosend = {
      ...formData,
      direccionDto: direccion,
    }
    try {
      const formDataFiltro = Object.fromEntries(
        Object.entries(dataTosend).filter(([key, value]) => value !== "")
      )
      const response = await fetch(
        "http://localhost:8080/datosDomicilio/Registrar",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formDataFiltro),
        }
      );
      if (response.ok) {
        navegar("/Consulta/PedidosUsuario");
      }
    } catch (e) {
      console.log("error al realizar el registro " + e);
    }
  };
  const total = costoProducto + costoEnvio;
  return (
    <PlantillaCuatro>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card2 shadow p-4">
              <h2>Agregar domicilio</h2>
              <form onSubmit={RegistrarDatosDomicilio}>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">
                    Nombre y apellido
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombreDto"
                    value={formData.nombreDto}
                    onChange={handleChange}
                    placeholder="Tal cual figure en el documento."
                  />
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="ciudad" className="form-label">
                      localidad
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="ciudad"
                      name="localidadDto"
                      onChange={handleChange}
                      value={formData.localidadDto}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="barrio" className="form-label">
                    Barrio
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="barrio"
                    name="barrioDto"
                    onChange={handleChange}
                    value={formData.barrioDto}
                  />
                </div>

                <div className="row mb-3">
                  <div className="col-md-3">
                    <label htmlFor="tipoCalle" className="form-label">
                      Tipo de calle
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="tipoCalle"
                      value={tipoCalle}
                      onChange={(e) => setTipoCalle(e.target.value)}
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="calle" className="form-label">
                      Calle
                    </label>
                    <input type="text" className="form-control" id="calle" value={calle} onChange={(e) => setCalle(e.target.value)} />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="numero" className="form-label">
                      Número
                    </label>
                    <input
                      disabled={sinNumero}
                      type="text"
                      className="form-control"
                      id="numero"
                      value={numero}
                      onChange={(e) => setNumero(e.target.value)}

                    />
                  </div>
                  <div className="col-md-3 d-flex align-items-center">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="sinNumero"
                        checked={sinNumero}
                        onChange={handleCheckboxChange}
                      />
                      <label className="form-check-label" htmlFor="sinNumero">
                        No tengo número
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="piso" className="form-label">
                    Piso/Departamento (opcional)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="piso"
                    name="pisoDepartamentoDto"
                    onChange={handleChange}
                    value={formData.pisoDepartamentoDto}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    ¿Es tu trabajo o tu casa?
                  </label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input
                        onChange={handleChange}
                        className="form-check-input"
                        type="radio"
                        name="casaOTrabajoDto"
                        id="laboral"
                        value="Laboral"
                      />
                      <label className="form-check-label" htmlFor="laboral">
                        Laboral
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        onChange={handleChange}
                        className="form-check-input"
                        type="radio"
                        name="casaOTrabajoDto"
                        id="residencial"
                        value="Residencial"
                      />
                      <label className="form-check-label" htmlFor="residencial">
                        Residencial
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="telefono" className="form-label">
                    Teléfono de contacto
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="telefono"
                    name="telefonoDto"
                    value={formData.telefonoDto}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="referencias" className="form-label">
                    Referencias adicionales de esta dirección
                  </label>
                  <textarea
                    name="adicionalesDto"
                    value={formData.adicionalesDto}
                    onChange={handleChange}
                    className="form-control"
                    id="referencias"
                    rows="3"
                    placeholder="Descripción de la fachada, puntos de referencia para encontrarla, indicaciones de seguridad, etc."
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">
                  Continuar
                </button>
              </form>
            </div>

            <div className="col-lg-4 position-relative">
              <div className="card resumen-compra">
                <div className="card-body">
                  <h5 className="card-title">Resumen de compra</h5>
                  <p className="card-text">
                    Envío: <span>${costoEnvio.toLocaleString()}</span>
                  </p>
                  <p className="card-text">
                    Total: <strong>${total.toLocaleString()}</strong>
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </PlantillaCuatro>
  );
};

export default RegistroPedido;
