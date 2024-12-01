import { useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import Plantilla from '../componentes/PlantillaUno';
import productos from '../img/productos.jpg';
import salud from '../img/salud.jpg';
import { GET_PRODUCTOS } from "../querys/productosQuery";
import ProductoCard from "./proyecto/productos/ProductoCard";

const Home = () => {
    const { loading, error, data } = useQuery(GET_PRODUCTOS);
    if (loading) return <p>Cargando...</p>
    if (error) return <p>Error:{error.message} </p>



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
                                    <img
                                        src={salud}
                                        className="d-block w-100"
                                        alt="Descripción de la imagen"
                                    />
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5>Agenda tu cita ahora!</h5>
                                        <p>Agenda una cita con nuestros expertos veterinarios para brindarle a tu mascota la atención y cuidado que se merece.</p>
                                        <Link to="/Cita/Consultar" className="btn btn-secondary">Agendar</Link>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <img
                                        src={productos}
                                        className="d-block w-100"
                                        alt="Productos veterinarios"
                                    />
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5>Todos los productos</h5>
                                        <p>Explora nuestra selección de productos veterinarios de alta calidad, diseñados para mantener la salud y el bienestar de tus mascotas.</p>
                                        <Link to="/productos/Consultar/" className="btn btn-secondary">Productos</Link>
                                    </div>
                                </div>
                            </div>
                            <button
                                className="carousel-control-prev"
                                type="button"
                                data-bs-target="#carouselExampleCaptions"
                                data-bs-slide="prev"
                            >
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button
                                className="carousel-control-next"
                                type="button"
                                data-bs-target="#carouselExampleCaptions"
                                data-bs-slide="next"
                            >
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </section>
                <section>
                    <ProductoCard productos={data.getproductos}></ProductoCard>
                    
                </section>


            </Plantilla>
        </>
    );
};
export default Home;
