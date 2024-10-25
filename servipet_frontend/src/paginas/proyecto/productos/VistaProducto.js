import React from "react";
import { Link } from "react-router-dom";
import Plantilla from '../componentes/PlantillaUno';
import productos from '../img/productos.jpg';
import { GET_PRODUCTOS } from "../querys/productosQuery";
import { useQuery } from "@apollo/client";

const VistaProducto = () => {
    const { loading, error, data } = useQuery(GET_PRODUCTOS);
    if (loading) return <p>Cargando...</p>
    if (error) return <p>Error:{error.message} </p>

return (
    <>
    <Plantilla tittle="Inicio -Servipet">
    <section className="bg-light py-5">
        <div className="container">
            <div className="product-container">
                <div className="product-image">
                    <img src={productos.imagenProducto}alt="Producto"/>
                </div>

                <div className="product-info">
                    <h5>Comida para la perra de oliwi 600g</h5>
                    <p>El producto es super rico, nutritivo y adecuado para mascotas pequeñas.</p>
                    <p className="product-price">$50.000</p>
                    <p >No se el producto es re melo bllasdaksdjksa </p>
                </div>
                <div className="product-actions">
                    <span>Compra ahora y dale lo mejor a tu mascota</span>
                    <button className="btn-cart">Agregar al carrito</button>
                </div>
            </div>
        </div>
    </section>

    <section className="recommended-products py-5">
        <div className="container">
            <h3>Pproductos recomendados</h3>
            <div className="row">
                <div className="col-md-4">
                    <div className="product-card">
                        <img src={productos.imagenProducto}alt="Producto 1"/>
                        <h5>Producto 1</h5>
                        <p>$mucho</p>
                        <button className="btn-cart">Agregar al carrito</button>
                    </div>
                </div>
        
                <div className="col-md-4">
                    <div className="product-card">
                        <img src={pproductos.imagenProducto}alt="Producto 2"/>
                        <h5>Producto 2</h5>
                        <p>$120214</p>
                        <button className="btn-cart">Agregar al carrito</button>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="product-card">
                        <img src={productos.imagenProducto} 
                        alt="Producto 3"/>
                        <h5>Producto 3</h5>
                        <p>$120400</p>
                        <button className="btn-cart">Agregar al carrito</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </Plantilla>
    </>
);
};
export default VistaProducto;