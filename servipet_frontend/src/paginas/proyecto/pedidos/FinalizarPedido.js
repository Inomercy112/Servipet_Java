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
  console.log(localStorage ["carrito"]);

  const [dataDomicilio, setDataDomicilio] = useState([]);
  const [costoEnvio] = useState(15000);
  const [formData, setFormData] = useState({
    quienCompraDto: localStorage["id"],
    horaCompraDto: new Date().toLocaleTimeString(),
    diaCompraDto: new Date().toISOString().split("T")[0],
    metodoEntregaDto: { idDto: id },
    estadoEntregaDto: { idDto: 1 }, // Asumiendo un estado inicial (cambiar según lógica)
    direccionDto: "",
    productosDto: carrito.map((producto) => ({
      idDto: producto.idDto,
      cantidadProductoDto: producto.cantidad,
      precioActualDto: producto.precioProductoDto,
      quienVendeDto: producto.duenoProductoDto,
    })),
  });

  const costoProducto = carrito.reduce(
    (sum, producto) => sum + producto.precioProductoDto * producto.cantidad,
    0
  );

  const handleOpcionDireccion = (e) => {
    const direccionSeleccionada = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      direccionDto: direccionSeleccionada,
    }));
  };

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
        navegar("/Consulta/PedidosUsuario");
      } else {
        alert("Error al registrar el pedido");
      }
    } catch (error) {
      console.error("Error al registrar el pedido:", error);
    }
  };

  useEffect(() => {
    const traerDomicilios = async () => {
      try {
        const data = await DatosDomicilioUsuario(localStorage["id"], token);
        setDataDomicilio(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error("Error al cargar domicilios:", error);
      }
    };
    traerDomicilios();
  }, [token]);

  const total = costoProducto + costoEnvio;

  return (
    <PlantillaCuatro>
      <div className="container mt-5">
        <div className="row container my-5">
          <div className="col-lg-8">
            <div className="card2 shadow p-4">
              <h2>Finalizar pedido</h2>
              <form onSubmit={RegistrarPedido}>
                <div className="mb-3">
                  <label className="form-label">Escoger domicilio: </label>
                  <div className="form-check">
                    {dataDomicilio.map((domicilio) => (
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
                    ))}
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
                <button type="submit" className="btn btn-primary">
                  Finalizar
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

