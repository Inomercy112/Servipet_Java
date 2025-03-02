import React from "react";
import { Link } from "react-router-dom";
import icono from "../img/Logo2.png";

function HeaderSolo() {
return (
    <>
    <header>
        <nav className="navbar navbar-expand-lg navbar-superior">
        </nav>
        <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
            <p className="navbar-brand">
                <Link to="/">
                <img
                    src={icono}
                    className="d-inline-block align-top"
                    alt="Logo"
                    height="100"
                />
                </Link>
            </p>
        </div>
        </nav>
    </header>
    </>
);
}

export default HeaderSolo;
