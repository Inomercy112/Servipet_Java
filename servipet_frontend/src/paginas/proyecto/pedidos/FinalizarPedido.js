import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlantillaCuatro from "../../../componentes/PlantillaCuatro";
import { useAuth } from "../../../context/AuthContext";
import { useCarrito } from "../../../context/CarritoContext";

const FinalizarPedido = () => {
  const navegar = useNavigate();
  const { token } = useAuth();
  const { carrito } = useCarrito(); 
  const [sinNumero, setSinNumero] = useState(false);
  const [tipoCalle, setTipoCalle] = useState("");
  const [calle, setCalle] = useState("");
  const [numero, setNumero] = useState("");
  const [opcionEntrega, setOpcionEntrega] = useState("");
  const [costoEnvio, setCostoEnvio] = useState(0); 

  const costoProducto = carrito.reduce(
    (sum, producto) => sum + producto.precioProductoDto,
    0
  );

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOpcionEntrega = (e) => {
    const opcion = e.target.value;
    setOpcionEntrega(opcion);
    setCostoEnvio(opcion === "Enviar a domicilio" ? 15000 : 0); 
  };

  const RegistrarDatosDomicilio = async (e) => {
    e.preventDefault();
    const direccion = `${tipoCalle} ${calle} ${
      sinNumero ? "(sin numero)" : `#${numero}`
    }`;
    const dataTosend = {
      ...formData,
      direccionDto: direccion,
    };
    try {
      const formDataFiltro = Object.fromEntries(
        Object.entries(dataTosend).filter(([key, value]) => value !== "")
      );
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
        <div className="row container my-5">
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
                    placeholder="Persona que recibe el pedido"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Opciones de entrega</label>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="domicilio"
                      value="Enviar a domicilio"
                      name="opcionEntrega"
                      onChange={handleOpcionEntrega}
                    />
                    <label htmlFor="domicilio" className="form-check-label">
                      Enviar a domicilio ($15,000)
                    </label>
                  </div>
              
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="retiroVendedor"
                      value="Retirar en el domicilio del vendedor"
                      name="opcionEntrega"
                      onChange={handleOpcionEntrega}
                    />
                    <label
                      htmlFor="retiroVendedor"
                      className="form-check-label"
                    >
                      Retirar en el domicilio del vendedor (Gratis)
                    </label>
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

                <button type="submit" className="btn btn-primary">
                  Continuar
                </button>
              </form>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card">
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
    </PlantillaCuatro>
  );
};

export default FinalizarPedido;
