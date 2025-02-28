import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const SidebarFilter = () => {
    const [priceRange, setPriceRange] = useState(37050);

    const handleSliderChange = (event) => {
        const value = parseInt(event.target.value);
        setPriceRange(value);
    };

    return (
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-light" style={{ width: '250px' }}>
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-dark min-vh-100">
                <p href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                    <span className="fs-5 d-none d-sm-inline">
                        <i className="bi bi-filter-left"></i> Filtros
                    </span>
                </p>
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li>
                        <a href="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-dark">
                            <i className="bi bi-sort-down"></i>{" "}
                            <span className="ms-1 d-none d-sm-inline">Categorias</span>
                        </a>
                        <ul className="collapse show nav flex-column ms-1 text-dark" id="submenu1">
                            <li className="w-100">
                                <a href="#" className="nav-link px-0 text-dark">
                                    <span className="d-none d-sm-inline text-dark"></span>Secos
                                </a>
                            </li>
                            <li>
                                <a href="#" className="nav-link px-0 text-dark">
                                    <span className="d-none d-sm-inline text-dark"></span>Humedos
                                </a>
                            </li>
                        </ul>
                    </li>

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
                                    <span>$1000000</span>
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