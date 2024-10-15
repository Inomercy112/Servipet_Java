import React from "react";
import { Link } from "react-router-dom";

function Footer(){
    return (
        <footer className="bg-light text-dark py-4">
    <div className="container">
        <div className="row">
            <div className="col-md-6">
                <h5>Software para Veterinarias</h5>
                <p>Este software está diseñado para ayudar a las clínicas veterinarias a gestionar sus clientes, mascotas, citas, registros médicos y más.</p>
            </div>
            <div className="col-md-6">
                <h5>Desarrollado por:</h5>
                <ul>
                    <li>Juan David Gonzalez Gonzales</li>
                    <li>Javier Santiago Garcia Cifuentes</li>
                </ul>
                <h5>Más información:</h5>
                <ul>
                    <li><Link to="mailto:gonzalezgonzalezjuandavid7@gmail.com">gonzalezgonzalezjuandavid7@gmail.com</Link></li>
                    <li><Link to="mailto:zhinc267@gmail.com">zhinc267@gmail.com</Link></li>
                    
                </ul>
            </div>
        </div>
    </div>
</footer>


    );
}
export default Footer;