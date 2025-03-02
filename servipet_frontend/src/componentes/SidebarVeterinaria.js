import React, { useEffect, useState } from "react";
import { DatosUsuario } from "./..//consultas/DatosPersonales"; // Asegúrate de importar correctamente la función
import { Link } from "react-router-dom";

const SidebarFilter = () => {
  const [user, setUser] = useState(null); // Estado local para almacenar los datos del usuario
  const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga

  useEffect(() => {
    const token = localStorage.getItem('token'); // Obtén el token del localStorage
    if (token) {
      DatosUsuario(token)
        .then(userData => {
          setUser(userData); // Almacena los datos del usuario en el estado
          setLoading(false); // Indica que la carga ha terminado
        })
        .catch(error => {
          console.error('Error al obtener los datos del usuario:', error);
          setLoading(false); // Indica que la carga ha terminado (incluso si hay un error)
        });
    } else {
      console.error('No se encontró el token en el localStorage');
      setLoading(false); // Indica que la carga ha terminado (no hay token)
    }
  }, []); // El array vacío asegura que esto solo se ejecute una vez al montar el componente

  // Verifica si los datos están cargando
  if (loading) {
    return <div>Cargando...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
  }

  if (!user) {
    return <div>No se pudieron cargar los datos del usuario.</div>;
  }

  return (
    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0  d-flex justify-content-center" style={{ width: "380px", height: "100%" }}>
      <div className="d-flex flex-column align-items-center px-3 pt-2 text-dark min-vh-100" style={{ width: "100%" }}>
        {/* Perfil del usuario */}
        <div className="profile text-center" style={{ marginBottom: '30px' }}>
          <img
            src={`data:image/png;base64,${user.imagenUsuarioDto}`}
            alt="profile_picture"
            style={{ width: '230px', height: '200px', borderRadius: '50%', margin: '0 auto' }}
          />
          <h3 style={{ color: '#000', margin: '10px 0 5px' }}>{user.nombreUsuarioDto}</h3>
          <p style={{ color: 'rgb(0, 0, 0)', fontSize: '14px' }}>BIENVENIDO</p>
          <Link to="/pedido/Historial/Veterinaria" style={{ textDecoration: "none" }}>
            <h3 style={{ color: 'rgb(0, 0, 0)', fontSize: '20px', marginTop: '300px' }}>
              <i className="bi bi-zoom-in"></i>Tus pedidos
            </h3>
          </Link>

        </div>

        <hr />
      </div>
    </div>
  );
};

export default SidebarFilter;