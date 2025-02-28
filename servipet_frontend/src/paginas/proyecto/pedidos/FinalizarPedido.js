import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import PlantillaCuatro from "../../../componentes/PlantillaCuatro";
import { DatosDomicilioUsuario } from "../../../consultas/DatosDomicilioUsuario";
import { useAuth } from "../../../context/AuthContext";
import { useCarrito } from "../../../context/CarritoContext";

const FinalizarPedido = () => {
  const navegar = useNavigate();
  const { token } = useAuth();
  const { carrito } = useCarrito();
  const location = useLocation();
  const { id } = useParams();

  let costoEnvio = id === "2" ? 15000 : 0;

  const [dataDomicilio, setDataDomicilio] = useState([]);
  const [direccionSeleccionada, setDireccionSeleccionada] = useState("");
  const [formData, setFormData] = useState(null);
  useEffect(() => {
    if (id !== "1") {
      const traerDomicilios = async () => {
        try {
          const data = await DatosDomicilioUsuario(localStorage.getItem("id"), token);
          setDataDomicilio(Array.isArray(data) ? data.filter(Boolean) : []);
        } catch (error) {
          console.error("Error al cargar domicilios:", error);
        }
      };
      traerDomicilios();
    }
  }, [id, token]);

  useEffect(() => {
    if (carrito.length > 0) {
      setFormData({
        quienCompraDto: localStorage.getItem("id"),
        horaCompraDto: new Date().toLocaleTimeString(),
        diaCompraDto: new Date().toISOString().split("T")[0],
        metodoEntregaDto: { idDto: id },
        estadoEntregaDto: { idDto: 1 },
        direccionDto: id === "2" ? direccionSeleccionada : null,
        productosDto: carrito.map((producto) => ({
          idDto: producto.idDto,
          cantidadProductoDto: producto.cantidad,
          precioActualDto: producto.precioProductoDto,
          quienVendeDto: producto.duenoProductoDto,
        })),
      });
    }
  }, [carrito, direccionSeleccionada, id]);

  const handleOpcionDireccion = (e) => {
    setDireccionSeleccionada(e.target.value);
  };

  const costoProducto = carrito.reduce(
    (sum, producto) => sum + producto.precioProductoDto * producto.cantidad,
    0
  );

  const total = costoProducto + costoEnvio;

  const RegistrarPedido = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/pedido/Registrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Pedido registrado con éxito");
        localStorage.removeItem("carrito");
        navegar("/pedido/Historial/Usuario");
      } else {
        alert("Error al registrar el pedido");
      }
    } catch (error) {
      console.error("Error al registrar el pedido:", error);
    }
  };

  return (
    <PlantillaCuatro>
      <div className="container mt-5">
        <div className="row container my-5">
          <div className="col-lg-8">
            <div className="card2 shadow p-4">
              <h2>Finalizar pedido</h2>
              <form onSubmit={RegistrarPedido}>
                {id !== "1" && (
                  <div className="mb-3">
                    <label className="form-label">Escoger domicilio: </label>
                    <div className="form-check">
                      {dataDomicilio.length > 0 ? (
                        dataDomicilio.map((domicilio) => (
                          <div key={domicilio.idDto}>
                            <input
                              type="radio"
                              className="form-check-input"
                              id={`domicilio-${domicilio.idDto}`}
                              value={domicilio.direccionDto}
                              name="direccionDto"
                              onChange={handleOpcionDireccion}
                              required
                            />
                            <label
                              htmlFor={`domicilio-${domicilio.idDto}`}
                              className="form-check-label"
                            >
                              {domicilio.direccionDto}
                            </label>
                          </div>
                        ))
                      ) : (
                        <p>No tienes domicilios registrados.</p>
                      )}
                    </div>
                    <p>
                      <Link
                        state={{ from: location.pathname }}
                        to={{ pathname: "/Pedido/Registro" }}
                      >
                        Agregar nuevo domicilio
                      </Link>
                    </p>
                  </div>
                )}
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={id !== "1" && dataDomicilio.length === 0}
                >
                  Finalizar
                </button>
                <Link to="/Pedido/CheckButton/" 
                state={{formData}}
                >
                  mercadopago
                </Link>
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
