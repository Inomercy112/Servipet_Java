import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import { CarritoProvider } from './context/CarritoContext';
import './index.css';
//import paginas
import Home from './paginas/Home';

import Login from './paginas/proyecto/formularios/Login';
//import usuarios
import ActualizarUsuario from './paginas/actualizacion/ActualizacionUsuario';
import ContrasenaRecordar from './paginas/proyecto/formularios/ContrasenaRecordar';
import CorreoRecordar from './paginas/proyecto/formularios/CorreoRecordar';
import UsuarioRegistro from "./paginas/proyecto/formularios/RegistroUsuario";
import RegistroVeterinaria from "./paginas/proyecto/formularios/RegistroUsuarioVeterinario";
import UsuarioConsultar from './paginas/proyecto/usuario/consultarUsuario';
import DetallesPerfil from './paginas/proyecto/usuario/detallesPerfil';
import IndexVeterinaria from './paginas/proyecto/usuario/indexVeterinario';

//import citas
import ConsultarCitas from './paginas/proyecto/citas/ConsultarCita';
import DetallesMascota from './paginas/proyecto/citas/DetallesMascota';
import ListadoVeterinarias from './paginas/proyecto/citas/ListadoVeterinarias';
import CitaConsultar from './paginas/proyecto/citas/historialCita';
import CitaRegistrar from './paginas/proyecto/formularios/RegistroCita';
//import mascotas
import MascotaActualizar from './paginas/actualizacion/actualizarMascota';
import MascotaRegistrar from "./paginas/proyecto/formularios/MascotaRegistrar";
import MascotaConsultar from './paginas/proyecto/mascotas/consultaMascota';

import ProtectedRoute from './ProtectedRoute';

//import categoria
import ConsultarCategoria from './paginas/proyecto/categorias/ConsultarCategoria';

//import productos
import ProductoActualizar from './paginas/actualizacion/ActualizarProducto';
import ProductoRegistrar from './paginas/proyecto/formularios/RegistrarProducto';
import CarritoPedido from './paginas/proyecto/pedidos/CarritoPedido';
import ProductoConsultar from './paginas/proyecto/productos/ConsultarProducto';
import ProductoConsultarUsuario from './paginas/proyecto/productos/ConsultarProductoUsuario';
import DetallesProducto from './paginas/proyecto/productos/DetallesProducto';
//import pedidos
import { SearchProvider } from './context/BuscadorContext';
import { CategoriaProvider } from './context/CategoriaContext';
import { CitaProvider } from './context/CitaContext';
import PedidoRegistrar from './paginas/proyecto/formularios/RegistroPedido';
import CheckoutButton from './paginas/proyecto/pedidos/CheckButton';
import FinalizarPedido from './paginas/proyecto/pedidos/FinalizarPedido';
import OpcionesEntrega from './paginas/proyecto/pedidos/OpcionesEntrega';
import HistorialPedidos from './paginas/proyecto/usuario/historialPedido';
function App(){
  

  return (
    <CategoriaProvider>
    <CarritoProvider>
    <CitaProvider>
    <AuthProvider>
    <SearchProvider>

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />}/>
        <Route path='/IndexVeterinaria' element={<IndexVeterinaria/>}/>
        <Route path="/Usuario/Registro" element={<UsuarioRegistro/>}/>
        <Route path="/Usuario/Registro2" element={<RegistroVeterinaria/>}/>
        <Route path='/Correo-Recordar' element={<CorreoRecordar/>}/>
        <Route path='/Contrasena-Recordar' element={<ContrasenaRecordar/>}/>
        <Route path="/Usuario/Consultar"   element={<ProtectedRoute roles={["administrador"]}><UsuarioConsultar/></ProtectedRoute>}/>
        <Route path='/Categoria/Consultar' element={<ProtectedRoute roles={["administrador"]}><ConsultarCategoria/></ProtectedRoute>}/>
        <Route path='/Usuario/Perfil'   element={<DetallesPerfil/>}/>
        <Route path="/Cita/Consultar"   element={<ProtectedRoute roles={["cliente"]}> <CitaConsultar/> </ProtectedRoute> }/>
        <Route path='/Cita/Consultar-veterinaria' element={<ProtectedRoute roles={["cliente"]}> <ListadoVeterinarias/>  </ProtectedRoute>} />
        <Route path="/Cita/Registrar/:id"   element={<CitaRegistrar/>}/>
        <Route path='/Cita/MascotaAsiste/:id' element={<DetallesMascota/>}/>
        <Route path='/Cita/Consultar/Vet' element={<ConsultarCitas/>}/>
        <Route path="/Mascota/Consultar"element={<ProtectedRoute roles={["cliente"]}><MascotaConsultar/> </ProtectedRoute>}/>
        <Route path="/Mascota/Registrar"element={<MascotaRegistrar/>}/>
        <Route path='/Usuario/Actualizar' element={<ActualizarUsuario/>}/>
        <Route path='/Mascota/Actualizar/:id' element ={<MascotaActualizar/>}/>
        <Route path='/Producto/Registrar' element={<ProductoRegistrar/>} />
        <Route path='/Producto/Consultar' element={<ProductoConsultar/>} />
        <Route path='/Producto/Consultar/:id' element={<ProductoConsultarUsuario/>}/>
        <Route path='/Producto/Actualizar/:id' element={<ProductoActualizar/>}/>
        <Route path='/producto/detalles/:id' element={<DetallesProducto/>} />
        <Route path='/producto/carrito' element={<CarritoPedido/>} />
        <Route path='/Pedido/CheckButton/' element={<ProtectedRoute roles={["cliente","administrador"]}><CheckoutButton/> </ProtectedRoute>} />
        <Route path='/Pedido/Registro' element={<ProtectedRoute roles={["cliente", "administrador"]}><PedidoRegistrar/>  </ProtectedRoute> } />
        <Route path='/Pedido/Opciones' element ={<ProtectedRoute roles={["cliente"]}> <OpcionesEntrega/> </ProtectedRoute>}/>
        <Route path='/Pedido/Finalizar/:id' element={<FinalizarPedido/>}/>
        <Route path='/pedido/Historial/Usuario' element={<ProtectedRoute roles={["cliente"]}><HistorialPedidos/>  </ProtectedRoute>}/>
      </Routes>
    </Router>
    </SearchProvider>
    </AuthProvider>
    </CitaProvider>
    </CarritoProvider>
    </CategoriaProvider>
    

  );
}
export default App;