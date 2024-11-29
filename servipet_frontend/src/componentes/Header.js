import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { DatosCategoria } from "../consultas/DatosCategoria";
import icono from "../img/Logo.png";

function Header() {
  const id = localStorage["id"];
  const rolUsuario = parseInt(localStorage["RolUsuario"]);
  const navegars = useNavigate();
  const { token } = useAuth();
  const { logout } = useAuth();
  const [categoria, setCategoria] = useState([]);

    useEffect(() =>{
      const CargarCategorias = async () =>{
        try {
          const data = await DatosCategoria();
          setCategoria(Array.isArray(data) ? data : [data]);
      }catch(e){
        console.error("error al cargar las categorias");
      }
    };
    CargarCategorias();
    }, []);


  const [isProductDropdownOpen, setProductDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);

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

  return (
    <>
      
      <header>
      <nav className="navbar navbar-expand-lg navbar-superior">
  <div className="container-fluid">
    <form className="d-flex" role="search">
      <input
        className="form-control me-2"
        type="search"
        placeholder="Buscar"
        aria-label="Search"
      />
      <button className="btn btn-outline-success" type="submit">
        Buscar
      </button>
    </form>
  </div>
</nav>

     
        
        
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            {rolUsuario !== 2 ? (
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
            ) : (
              <>
                <p className="navbar-brand">
                  <Link to="/IndexVeterinaria">
                    <img
                      src={icono}
                      className="d-inline-block align-top"
                      alt="Logo"
                      height="100"
                    />
                  </Link>
                </p>
                
                <Link to="/IndexVeterinaria" className="navbar-brand">
                  ServiPet
                </Link>

                

              </>
            )}


            
            <button
              className="navbar-toggler"
              type="button"
              onClick={() => setProductDropdownOpen(!isProductDropdownOpen)}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
           
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                {rolUsuario === 2 && (
                  <>
                    <li className="nav-item">
                      <Link
                        to="/Cita/Consultar/Vet"
                        className="nav-link active"
                        aria-current="page"
                      >
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

                {rolUsuario !== 2 && (
                  <>
                    <li className="nav-item">
                      <Link
                        to="/Cita/Consultar"
                        className="nav-link active"
                        aria-current="page"
                      >
                        Citas
                      </Link>
                    </li>
                    {id && (
                      <>
                        <li className="nav-item">
                          <Link to="/Usuario/Consultar" className="nav-link">
                            Usuario
                          </Link>
                        </li>
                        {rolUsuario === 1 && (
                          <li className="nav-item">
                            <Link to="/Mascota/Consultar" className="nav-link">
                              Mascotas
                            </Link>
                          </li>
                        )}
                      </>
                    )}
                    <li className="nav-item dropdown">
                      <button
                        className="nav-link dropdown-toggle"
                        id="productDropdown"
                        onClick={() =>
                          setProductDropdownOpen(!isProductDropdownOpen)
                        }
                        aria-haspopup="true"
                        aria-expanded={isProductDropdownOpen}
                      >
                        Productos
                      </button>
                      <ul
                        className={`dropdown-menu ${
                          isProductDropdownOpen ? "show" : ""
                        }`}
                        aria-labelledby="productDropdown"
                      >{categoria.map(catagoria =>(
                        <li key={catagoria.id}>
                        <Link
                          to={`/Producto/Consultar/${catagoria.id}`}
                          className="dropdown-item"
                        >
                          {catagoria.nombreCategoria}
                        </Link>
                      </li>

                      ))
                        }
                      </ul>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/producto/carrito"
                        className="nav-link active"
                        aria-current="page"
                      >
                        Carrito
                        <span className="badge bg-danger">2</span>
                      </Link>
                    </li>
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
                      className={`dropdown-menu ${
                        isUserDropdownOpen ? "show" : ""
                      }`}
                      aria-labelledby="userDropdown"
                    >
                      <Link to="/Usuario/Perfil" className="dropdown-item">
                        Perfil
                      </Link>
                      {rolUsuario === 3 && (
                        <Link to="/Macota/Consultar" className="dropdown-item">
                          Tu mascota
                        </Link>
                      )}
                      <button onClick={CerrarSesion} className="dropdown-item">
                        Cerrar sesión
                      </button>
                    </div>
                  </li>
                ) : (
                  <Link to="/login" className="nav-link active">
                    Iniciar Sesión
                  </Link>
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
