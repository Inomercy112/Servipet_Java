import { useQuery } from "@apollo/client";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Cambiado Link por useNavigate
import PlantillaUno from "../../../componentes/PlantillaUno";
import { useCarrito } from "../../../context/CarritoContext";
import { GET_PRODUCTOS_ESPECIFICO } from "../../../querys/productoEspecifcoQuery";
import { GET_PRODUCTOS } from "../../../querys/productosQuery";
import logo from "./../../../img/Logo.png";
import PreguntasRespuestas from "./PreguntasYRespuestas"; // Importar el componente actualizado
import ProductoCard from "./ProductoCard";
const DetallesProducto = () => {
    const { agregarAlCarrito } = useCarrito();
    const { id } = useParams();
    const navegar = useNavigate();


    const { loading: queryLoading, error: errorEsp, data: dataEsp } = useQuery(GET_PRODUCTOS_ESPECIFICO, {
        variables: { id },
    });
    
    const { loading: loadingAll, error: errorAll, data: dataAll } = useQuery(GET_PRODUCTOS); // 💡 Moverlo arriba
    
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);
    
    // Si el temporizador O la consulta siguen cargando, mostrar animación
    if (loading || queryLoading)
        return (
            <div className="loading-container">
                <Spin size="large" />
                <img src={logo} alt="Cargando..." className="logo-palpita" />
            </div>
        );
    
    if (errorEsp) return <p>Error: {errorEsp.message}</p>;
    if (errorAll) return <p>Error todos los productos: {errorAll.message}</p>;
    
    const { getproductoById } = dataEsp;
    const { getproductos } = dataAll;

    const handleComprarAhora = () => {
        agregarAlCarrito(getproductoById);
        navegar("/Pedido/Opciones");
    };

    return (
        <PlantillaUno>
            <section className="bg-light py-5">
                <div className="container">
                    <div className="product-container">
                        <div className="product-image">
                            <img src={`data:image/jpeg;base64,${getproductoById.imagenProductoDto}`} alt="Producto" />
                        </div>
                        <div className="product-info">
                            <h5>{getproductoById.nombreProductoDto}</h5>
                            <p>{getproductoById.descripcionProductoDto}</p>
                            <p>{getproductoById.categoriasNombresDto.length > 0 ? (
                                                getproductoById.categoriasNombresDto.map((categoria, index) => (
                                                    <span key={index}>
                                                        - {categoria}
                                                    </span>
                                                ))
                                            ) : (
                                                <span>Sin categorías</span>
                                            )}</p>
                            <p className="product-price">${getproductoById.precioProductoDto}</p>
                        </div>
                        <div className="product-actions">
                            {getproductoById.cantidadProductoDto === 1 ? (
                                <p>¡Última unidad!</p>
                            ) : (
                                <p>Unidades disponibles: {getproductoById.cantidadProductoDto}</p>
                            )}
                            <button onClick={() => agregarAlCarrito(getproductoById)} className="btn btn-cart">
                                Agregar al carrito
                            </button>
                            <button onClick={handleComprarAhora} className="btn btn-cart">
                                Comprar ahora
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección de preguntas y respuestas */}
            <section className="container my-5">
                <PreguntasRespuestas idProducto={id} />
            </section>

            {/* Productos relacionados */}
            <ProductoCard productos={getproductos} />
        </PlantillaUno>
    );
};

export default DetallesProducto;
