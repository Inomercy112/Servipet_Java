import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CategoriaContext } from "./../context/CategoriaContext"; 

const SidebarFilter = () => {
    const [priceRange, setPriceRange] = useState(0);
    const [isCategoriasOpen, setIsCategoriasOpen] = useState(false);

    
    const { categoria, loading } = useContext(CategoriaContext);

    const handleSliderChange = (event) => {
        setPriceRange(parseInt(event.target.value));
    };

    const toggleCategorias = () => {
        setIsCategoriasOpen(!isCategoriasOpen);
    };

    return (
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-light" style={{ width: "230px", height: "100%" }}>
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-dark min-vh-100">
                <p className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                    <span className="fs-5 d-none d-sm-inline">
                        <i className="bi bi-filter-left"></i> Filtros
                    </span>
                </p>
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    {/* Categorías dinámicas */}
                    <li>
                        <a
                            href="#submenu1"
                            onClick={(e) => {
                                e.preventDefault();
                                toggleCategorias();
                            }}
                            className="nav-link px-0 align-middle text-dark"
                        >
                            <i className="bi bi-sort-down"></i>{" "}
                            <span className="ms-1 d-none d-sm-inline">Categorías</span>
                        </a>
                        <ul className={`collapse ${isCategoriasOpen ? "show" : ""} nav flex-column ms-1 text-dark`} id="submenu1">
                            {loading ? (
                                <li className="w-100">
                                    <span className="nav-link px-0 text-dark">Cargando categorías...</span>
                                </li>
                            ) : (
                                categoria.map((categoria) => (
                                    <li key={categoria.idDto} className="w-100">
                                        <Link to={`/Producto/Consultar/${categoria.nombreCategoriaDto}`} className="nav-link px-0 text-dark">
                                            <span className="d-none d-sm-inline">{categoria.nombreCategoriaDto}</span>
                                        </Link>
                                    </li>
                                ))
                            )}
                        </ul>
                    </li>

                    {/* Rango de Precio */}
                    <li>
                        <a href="#submenu2" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-dark">
                            <i className="bi bi-cash-stack text-dark"></i>{" "}
                            <span className="ms-1 d-none d-sm-inline">Rango de precio</span>
                        </a>
                        <ul className="collapse nav flex-column ms-1" id="submenu2">
                            <div className="slider-container">
                                <input
                                    type="range"
                                    min="0"
                                    max="1000000"
                                    value={priceRange}
                                    className="slider"
                                    id="priceSlider"
                                    onChange={handleSliderChange}
                                />
                                <div className="price-range">
                                    <span>${priceRange.toLocaleString()}</span>
                                    <span>$1,000,000</span>
                                </div>
                            </div>
                        </ul>
                    </li>
                </ul>
                <hr />
            </div>
        </div>
    );
};

export default SidebarFilter;