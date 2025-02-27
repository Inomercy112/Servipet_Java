import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Plantilla from '../componentes/PlantillaUno';
import { SearchContext } from "../context/BuscadorContext";
import { CategoriaContext } from "../context/CategoriaContext";
import salud from '../img/salud.jpg';
import { GET_PRODUCTOS } from "../querys/productosQuery";
import ProductoCard from "./proyecto/productos/ProductoCard";

const Home = () => {
    const { categoria } = useContext(CategoriaContext);
    const { searchTerm } = useContext(SearchContext);
    const { loading, error, data } = useQuery(GET_PRODUCTOS);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // Validar que 'data' y 'getproductos' existen antes de aplicar el filtro
    const productos = data?.getproductos || [];

    // Filtrar productos según el término de búsqueda
    const productosFiltrados = productos.filter((producto) =>
        producto.nombreProductoDto.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                                    <img src={productos} className="d-block w-100" alt="Productos veterinarios" />
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5>Todos los productos</h5>
                                        <p>Explora nuestra selección de productos veterinarios de alta calidad, diseñados para mantener la salud y el bienestar de tus mascotas.</p>
                                        <Link to="/productos/Consultar/" className="btn btn-secondary">Productos</Link>
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

                    {/* 🔍 Mostrar productos filtrados si hay una búsqueda */}
                    {searchTerm ? (
                        <section>
                            <h5 className="container">Resultados de búsqueda</h5>
                            <ProductoCard productos={productosFiltrados} />
                        </section>
                    ) : (
                        // Mostrar categorías solo si NO hay búsqueda
                        categoria.map((cat) => {
                            const productosPorCategoria = productos.filter((producto) =>
                                producto.categoriasNombresDto.includes(cat.nombreCategoriaDto)
                            );

                            if (productosPorCategoria.length > 0) {
                                return (
                                    <section key={cat.idDto}>
                                        <h5 className="container">{cat.nombreCategoriaDto}</h5>
                                        <ProductoCard productos={productosPorCategoria} />
                                    </section>
                                );
                            }
                            return null;
                        })
                    )}
                </section>
            </Plantilla>
        </>
    );
};

export default Home;
