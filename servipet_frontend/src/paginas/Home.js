import React from "react";
import { Link } from "react-router-dom";
import Plantilla from '../componentes/PlantillaUno';
import salud from '../img/salud.jpg';
import productos from '../img/productos.jpg';
const Home = () => {
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
                                <Link to="/agendar" className="btn btn-primary">Agendar</Link>
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
                                <Link to="/productos" className="btn btn-primary">Productos</Link>
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

        <section className="bg-light text-white py-5">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <div className="card text-center text-black bg-secundary mb-3">
                  <img src="/images/1p.jpg" className="card-img-top" alt="Producto 1"/>
                  <div className="card-body">
                    <h5 className="card-title">CHUNKY ADULTO 2kg</h5>
                    <p className="card-text">Precio: $ 18.150</p>
                    <Link to="/productos/menu1" className="btn btn-dark">Comprar</Link>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-center text-black bg-secundary mb-3">
                  <img src="/images/2p.jpg" className="card-img-top" alt="Producto 2"/>
                  <div className="card-body">
                    <h5 className="card-title">Whiskas Adulto Salmon 85g</h5>
                    <p className="card-text">Precio: $ 3.000</p>
                    <Link to="/productos/menu2" className="btn btn-dark">Comprar</Link>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-center text-black bg-secundary mb-3">
                  <img src="/images/3p.jpg" className="card-img-top" alt="Producto 3"/>
                  <div className="card-body">
                    <h5 className="card-title">Nutrecan Atleta 25kg</h5>
                    <p className="card-text">Precio: $ 343.750</p>
                    <Link to="/productos/menu3" className="btn btn-dark">Comprar</Link>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-center text-black bg-secundary mb-3">
                  <img src="/images/5p.jpg" className="card-img-top" alt="Producto 4"/>
                  <div className="card-body">
                    <h5 className="card-title">CUIDO DOGCHOW 475G</h5>
                    <p className="card-text">Precio: $ 5.850</p>
                    <Link to="/productos/menu4" className="btn btn-dark">Comprar</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        </Plantilla>
      </>
      
    );
  };
  
  export default Home;