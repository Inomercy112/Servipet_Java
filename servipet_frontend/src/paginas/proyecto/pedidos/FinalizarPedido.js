import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import PlantillaCuatro from "../../../componentes/PlantillaCuatro";
import { DatosDomicilioUsuario } from "../../../consultas/DatosDomicilioUsuario";
import { useAuth } from "../../../context/AuthContext";
import { useCarrito } from "../../../context/CarritoContext";
import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";
import { Button } from "react-bootstrap";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const FinalizarPedido = () => {
    const navegar = useNavigate();
    const { token } = useAuth();
    const { carrito, limpiarCarrito } = useCarrito();
    const location = useLocation();
    const { id } = useParams();

    const costoEnvio = id === "2" ? 0 : 0;
    const [dataDomicilio, setDataDomicilio] = useState([]);
    const [direccionSeleccionada, setDireccionSeleccionada] = useState("");
    const [formData, setFormData] = useState(null);
    const [preferenceId, setPreferenceId] = useState(null); // Estado para la preferencia de MercadoPago

    // Cargar domicilios si no es recoger en tienda
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

    // Preparar los datos del formulario
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

    // Manejar la selección de domicilio
    const handleOpcionDireccion = (e) => {
        setDireccionSeleccionada(e.target.value);
    };

    // Calcular el costo total
    const costoProducto = carrito.reduce(
        (sum, producto) => sum + producto.precioProductoDto * producto.cantidad,
        0
    );
    const total = costoProducto + costoEnvio;

    // Registrar el pedido
    const RegistrarPedido = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${backendUrl}//pedido/Registrar`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Pedido registrado con éxito");
                limpiarCarrito(); // Limpia el carrito
                localStorage.removeItem("carrito"); // Limpia el carrito en localStorage
                navegar("/pedido/Historial/Usuario");
            } else {
                alert("Error al registrar el pedido");
            }
        } catch (error) {
            console.error("Error al registrar el pedido:", error);
        }
    };

    // Crear preferencia de pago con MercadoPago
    const createPreference = async () => {
        try {
            initMercadoPago("APP_USR-57f8f4dd-98e1-42b5-b793-f23f4fd37333", { locale: "es-CO" });
            const response = await fetch(`${backendUrl}/api/payment/create_preference`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });
            const data = await response.text();
            return data;
        } catch (error) {
            console.error("Error al crear la preferencia de pago:", error);
        }
    };

    // Manejar el pago con MercadoPago
    const handlePagarConMercadoPago = async () => {
        const id = await createPreference();
        if (id) {
            setPreferenceId(id); // Establece el ID de la preferencia
            localStorage.removeItem("carrito"); // Limpia el carrito
        }
    };

    return (
        <PlantillaCuatro>
            <div className="container mt-5">
                <div className="row">
                    {/* Columna izquierda: Detalles del pedido */}
                    <div className="col-lg-8">
                        <div className="card shadow p-4">
                            <h2 className="mb-4">Finalizar pedido</h2>
                            <form onSubmit={RegistrarPedido}>
                                {/* Mostrar selección de domicilio solo si no es recoger en tienda */}
                                {id !== "1" && (
                                    <div className="mb-4">
                                        <h5>Selecciona tu domicilio de envío:</h5>
                                        {dataDomicilio.length > 0 ? (
                                            dataDomicilio.map((domicilio) => (
                                                <div key={domicilio.idDto} className="form-check mb-2">
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
                                            <p className="text-muted">No tienes domicilios registrados.</p>
                                        )}
                                        <p className="mt-2">
                                            <Link
                                                to="/Pedido/Registro"
                                                state={{ from: location.pathname }}
                                                className="btn btn-outline-primary btn-sm"
                                            >
                                                Agregar nuevo domicilio
                                            </Link>
                                        </p>
                                    </div>
                                )}

                                {/* Botón para finalizar pedido */}
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 mt-3"
                                    disabled={id !== "1" && dataDomicilio.length === 0}
                                >
                                    Finalizar pedido
                                </button>

                                {/* Botón para pagar con MercadoPago */}
                                {id !== "1" && (
                                    <Button
                                        onClick={handlePagarConMercadoPago}
                                        className="btn btn-success w-100 mt-2"
                                    >
                                        Pagar con MercadoPago
                                    </Button>
                                )}
                            </form>
                        </div>
                    </div>

                    {/* Columna derecha: Resumen de la compra */}
                    <div className="col-lg-4">
                        <div className="card shadow p-4">
                            <h5 className="mb-4">Resumen de la compra</h5>
                            <ul className="list-group list-group-flush">
                                {carrito.map((producto) => (
                                    <li key={producto.idDto} className="list-group-item d-flex justify-content-between">
                                        <span>{producto.nombreProductoDto}</span>
                                        <span>${(producto.precioProductoDto * producto.cantidad).toLocaleString()}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-3">
                                <p className="d-flex justify-content-between">
                                    <span>Subtotal:</span>
                                    <span>${costoProducto.toLocaleString()}</span>
                                </p>
                                {id === "2" && (
                                    <p className="d-flex justify-content-between">
                                        <span>Envío:</span>
                                        <span>${costoEnvio.toLocaleString()}</span>
                                    </p>
                                )}
                                <p className="d-flex justify-content-between fw-bold">
                                    <span>Total:</span>
                                    <span>${total.toLocaleString()}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mostrar el botón de MercadoPago si hay una preferencia */}
            {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} />}
        </PlantillaCuatro>
    );
};

export default FinalizarPedido;