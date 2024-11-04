import PlantillaUno from "../../../componentes/PlantillaUno";

const RegistroPedido = () => {
    return (
        <PlantillaUno>
            <div className="container mt-5">
                <h2>Formulario de Pago</h2>
                <form id="formularioPago">
                    <div className="mb-3">
                        <label htmlFor="cantidad" className="form-label">
                            Cantidad de Producto:
                        </label>
                        <input
                            type="text"
                            id="cantidad"
                            className="form-control"
                            value="3"
                            readonly
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="valorFinal" className="form-label">
                            Valor Final de la Compra:
                        </label>
                        <input
                            type="text"
                            id="valorFinal"
                            className="form-control"
                            value="$25.000"
                            readonly
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="nombreComprador" className="form-label">
                            Nombre del Comprador:
                        </label>
                        <input
                            type="text"
                            id="nombreComprador"
                            className="form-control"
                            value="Pedro Barros"
                            readonly
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="metodoEntrega" className="form-label">
                            Método de Entrega:
                        </label>
                        <select
                            className="form-select"
                            id="metodoEntrega"
                            name="metodoEntrega"
                        >
                            <option selected>Seleccionar método de entrega</option>
                            <option value="1">Envío a domicilio</option>
                            <option value="2">Retiro en tienda</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="direccion" className="form-label">
                            Direccion de Envío:
                        </label>
                        <input
                            type="text"
                            id="direccion"
                            className="form-control"
                            placeholder="En caso de haber seleccionado Envío a domicilio"
                        />
                    </div>
                    <button
                        type="button"
                        onclick="validarCampo()"
                        className="btn btn-dark"
                    >
                        Realizar Pago
                    </button>
                </form>
            </div>
        </PlantillaUno>
    );
};
export default RegistroPedido;
