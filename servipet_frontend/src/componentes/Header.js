import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import icono from '../img/Logo.png';
function Header() {
  const id = localStorage['id'];
  const navegars = useNavigate();
  const {token} = useAuth();
  const {logout} = useAuth();
  const CerrarSesion =(id) =>{
    try{
    fetch("http://localhost:8080/autenticacion/Logout",{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(Response => {
      if (Response.ok){
        logout();
        navegars("/");
        
      } else{
        console.error("error al cerrar sesion");
      }
    })
  } catch(error){
    console.error("error al realizar el cierre");

  }
  }
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <p className="navbar-brand">
              <Link to='/'>
                <img 
                  src={icono}
                  className="d-inline-block align-top" 
                  alt="Logo" 
                  height="100" 
                />
              </Link>
            </p>
            <Link to="/" className="navbar-brand">ServiPet</Link>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown" 
              aria-expanded="false" 
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/Cita/Consultar" className="nav-link active" aria-current="page">Citas</Link>
                </li>
                <li className="nav-item">  
                  <Link to="/Usuario/Consultar" className="nav-link">Usuario</Link>
                </li>
                <li className='nav-item'>
                  <Link to='/Mascota/Consultar' className='nav-link'>Mascotas</Link>
                </li>
                <li className="nav-item dropdown">
                  <button 
                    className="nav-link dropdown-toggle" 
            
             
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Productos
                  </button>
                  <ul className="dropdown-menu">
                    <li><Link to="../Productos/menur2.html" className="dropdown-item">Secos</Link></li>
                    <li><Link to="../Productos/menur1.html" className="dropdown-item">Humedos</Link></li>
                    <li><Link to="../Productos/menur3.html" className="dropdown-item">Belleza/Higiene</Link></li>
                    <li><Link to="../Productos/menur4.html" className="dropdown-item">Juguetes</Link></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link to="../Pedido/pedido.html" className="nav-link active" aria-current="page">
                    Carrito
                    <span className="badge bg-danger">2</span>
                  </Link>
                </li>
                <form className="d-flex" role="search">
                  <input 
                    className="form-control me-2" 
                    type="search" 
                    placeholder="Buscar" 
                    aria-label="Search" 
                  />
                  <button className="btn btn-outline-success" type="submit">Buscar</button>
                </form>
                <li className="nav-item dropdown">
                  <button 
                    className="nav-link dropdown-toggle" 
                  
                    id="navbarDropdown" 
              
                    data-bs-toggle="dropdown"
                    aria-haspopup="true" 
                    aria-expanded="false"
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
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link to="/Usuario/Perfil" className="dropdown-item">Perfil</Link>
                    <Link to="../Macotas/mascotagen.html" className="dropdown-item">Tu mascota</Link>
                    {id ? (
                      <button onClick={CerrarSesion} className='dropdown-item'>Cerrar sesion</button>
                      
                    ) : (
                        <Link to="/login" className="dropdown-item">Iniciar Sesión</Link>
                    )}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="modal fade" id="perfilModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
