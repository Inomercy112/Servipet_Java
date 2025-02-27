import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { SearchContext } from "../context/BuscadorContext";
import { useCarrito } from "../context/CarritoContext";
import { CategoriaContext } from "../context/CategoriaContext";
import icono from "../img/Logo.png";
import Buscador from "./Buscador";
function Header() {
  const {setSearchTerm} = useContext(SearchContext);
  const id = localStorage["id"];
  const rolUsuario = localStorage["RolUsuario"] || null;
  const { carrito } = useCarrito();
  const conteoProducto = carrito.length;
  const navegars = useNavigate();
  const { token } = useAuth();
  const { logout } = useAuth();
  const { categoria } = useContext(CategoriaContext);
  const [isProductDropdownOpen, setProductDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleSearchChange = (e) =>{
    setSearchTerm(e.target.value);
  }

  const CerrarSesion = () => {
    try {
      fetch("http://localhost:8080/autenticacion/Logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((Response) => {
        if (Response.ok) {
          logout();
          navegars("/");
        } else {
          console.error("error al cerrar sesión");
        }
      });
    } catch (error) {
      console.error("error al realizar el cierre");
    }
  };

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light navbar-custom">
          <div className="container-fluid">
            <Link
              to={rolUsuario === "veterinaria" ? "/IndexVeterinaria" : "/"}
              className="navbar-brand"
            >
              <img src={icono} alt="Logo" height="100" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              onClick={handleNavCollapse}
              aria-expanded={!isNavCollapsed}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
              id="navbarNavDropdown"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {rolUsuario === "veterinaria" && (
                  <>
                    <li className="nav-item">
                      <Link to="/Cita/Consultar/Vet" className="nav-link">
                        Citas
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/Producto/Consultar" className="nav-link">
                        Productos
                      </Link>
                    </li>
                  </>
                )}

                {rolUsuario !== "veterinaria" && (
                  <>
                    {(rolUsuario === "cliente" || rolUsuario === null) && (
                      <li className="nav-item">
                        <Link
                          to="/Cita/Consultar-veterinaria"
                          className="nav-link"
                        >
                          Citas
                        </Link>
                      </li>
                    )}

                    {rolUsuario === "administrador" && (
                      <>
                        <li className="nav-item">
                          <Link to="/Usuario/Consultar" className="nav-link">
                            Usuarios
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/Categoria/Consultar" className="nav-link">
                            Categorias
                          </Link>
                        </li>
                      </>
                    )}

                    {rolUsuario === "cliente" && (
                      <li className="nav-item">
                        <Link to="/Mascota/Consultar" className="nav-link">
                          Mascotas
                        </Link>
                      </li>
                    )}

                    <li
                      className="nav-item dropdown"
                      onMouseEnter={() => setProductDropdownOpen(true)}
                    >
                      <button
                        className="nav-link dropdown-toggle"
                        id="productDropdown"
                        aria-haspopup="true"
                        aria-expanded={isProductDropdownOpen}
                        onClick={() => setProductDropdownOpen(!isProductDropdownOpen)}
                      >
                        Productos
                      </button>
                      <ul
                        className={`dropdown-menu ${isProductDropdownOpen ? "show" : ""}`}
                        aria-labelledby="productDropdown"
                      >
                        {categoria.map((catagoria) => (
                          <li key={catagoria.idDto}>
                            <Link
                              to={`/Producto/Consultar/${catagoria.nombreCategoriaDto}`}
                              className="dropdown-item"
                            >
                              {catagoria.nombreCategoriaDto}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>

                    <nav className="navbar navbar-expand-lg navbar-superior">
                      <Buscador></Buscador>
                    </nav>

                    {(rolUsuario === "cliente" || rolUsuario === null) && (
                      <li className="nav-item">
                        <Link to="/producto/carrito" className="nav-link">
                          <i className="bi bi-cart"></i>
                          <span className="badge bg-danger">{conteoProducto}</span>
                        </Link>
                      </li>
                    )}
                  </>
                )}

                {id ? (
                  <li className="nav-item dropdown">
                    <button
                      className="nav-link dropdown-toggle"
                      id="userDropdown"
                      onClick={() => setUserDropdownOpen(!isUserDropdownOpen)}
                      aria-haspopup="true"
                      aria-expanded={isUserDropdownOpen}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-user"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                      </svg>
                    </button>
                    <div
                      className={`dropdown-menu ${isUserDropdownOpen ? "show" : ""}`}
                      aria-labelledby="userDropdown"
                    >
                      <Link to="/Usuario/Perfil" className="dropdown-item">
                        Perfil
                      </Link>
                      {rolUsuario === "cliente" && (
                        <>
                          <Link to="/Mascota/Consultar" className="dropdown-item">
                            Tu mascota
                          </Link>
                          <Link to="/Cita/Consultar" className="dropdown-item">
                            Historial citas
                          </Link>
                          <Link to="/Pedido/Historial/Usuario" className="dropdown-item">
                            Historial pedidos
                          </Link>
                        </>
                      )}
                      <button onClick={CerrarSesion} className="dropdown-item">
                        Cerrar sesión
                      </button>
                    </div>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      Iniciar Sesión
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;