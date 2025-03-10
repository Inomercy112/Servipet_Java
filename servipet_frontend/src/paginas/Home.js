import { useQuery } from "@apollo/client";
import { Carousel, Spin, Typography } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Plantilla from '../componentes/PlantillaUno';
import { CategoriaContext } from "../context/CategoriaContext";
import productosa from '../img/productosa.jpg';
import salud from '../img/salud.jpg';
import { GET_PRODUCTOS } from "../querys/productosQuery";
import logo from "./../img/Logo.png";
import ProductoCard from "./proyecto/productos/ProductoCard";


const Home = () => {
    const { Title } = Typography;
    const { categoria } = useContext(CategoriaContext);

    const { loading: queryLoading, error, data } = useQuery(GET_PRODUCTOS);
    const [loading, setLoading] = useState(true);
    const scrollRefs = useRef([]); // Almacena referencias de cada categoría

    const scrollLeft = (index) => {
        if (scrollRefs.current[index]) {
            scrollRefs.current[index].scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    const scrollRight = (index) => {
        if (scrollRefs.current[index]) {
            scrollRefs.current[index].scrollBy({ left: 300, behavior: "smooth" });
        }
    };
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
    if (error) return <p>Error: {error.message}</p>;

    // Validar que 'data' y 'getproductos' existen antes de aplicar el filtro
    const productos = data?.getproductos || [];

    return (
        <>
            <Plantilla title="Inicio - Servipet">
                <section>
                    <div className="container">
                        <div id="carouselExampleCaptions" className="carousel slide">
                            <div className="carousel-indicators">
                                <button
                                    type="button"
                                    data-bs-target="#carouselExampleCaptions"
                                    data-bs-slide-to="0"
                                    className="active"
                                    aria-current="true"
                                    aria-label="Slide 1"
                                ></button>
                                <button
                                    type="button"
                                    data-bs-target="#carouselExampleCaptions"
                                    data-bs-slide-to="1"
                                    aria-label="Slide 2"
                                ></button>
                            </div>
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src={salud} className="d-block w-100" alt="Descripción de la imagen" />
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5>Agenda tu cita ahora!</h5>
                                        <p>Agenda una cita con nuestros expertos veterinarios para brindarle a tu mascota la atención y cuidado que se merece.</p>
                                        <Link to="/Cita/Consultar" className="btn btn-secondary">Agendar</Link>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <img src={productosa} className="d-block w-100" alt="Productos veterinarios" />
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5>Todos los productos</h5>
                                        <p>Explora nuestra selección de productos veterinarios de alta calidad, diseñados para mantener la salud y el bienestar de tus mascotas.</p>
                                    </div>
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>

                    <>
                        {categoria?.length > 0 ? (
                            categoria.map((cat) => {
                                const productosPorCategoria = Array.isArray(productos)
                                    ? productos.filter((producto) =>
                                        producto.categoriasNombresDto.includes(cat.nombreCategoriaDto)
                                    )
                                    : [];

                                if (productosPorCategoria.length === 0) {
                                    return null;
                                }

                                return (
                                    <section key={cat.idDto} className="container">
                                        <h5>{cat.nombreCategoriaDto}</h5>
                                        <Carousel arrows dots={false} prevArrow={<button>{'<'}</button>} nextArrow={<button>{'>'}</button>}>
                                            <ProductoCard productos={productosPorCategoria} />
                                        </Carousel>
                                    </section>
                                );
                            })
                        ) : (
                            <p>No hay categorías disponibles.</p>
                        )}
                    </>

                </section>
            </Plantilla>
        </>
    );
};

export default Home;
