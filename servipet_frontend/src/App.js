import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider } from './AuthContext';
import './index.css';
//import paginas
import Home from './paginas/Home';
import Login from './paginas/proyecto/formularios/Login';
//import usuarios
import ActualizarUsuario from './paginas/actualizacion/ActualizacionUsuario';
import UsuarioRegistro from "./paginas/proyecto/formularios/RegistroUsuario";
import UsuarioRegistro2 from "./paginas/proyecto/formularios/RegistroUsuario2";
import UsuarioConsultar from './paginas/proyecto/usuario/consultarUsuario';
import DetallesPerfil from './paginas/proyecto/usuario/detallesPerfil';
import IndexVeterinaria from './paginas/proyecto/usuario/indexVeterinario';
//import citas
import CitaConsultar from './paginas/proyecto/citas/historialCita';
import CitaRegistrar from './paginas/proyecto/formularios/RegistroCita';
import ConsultarCitas from './paginas/proyecto/citas/ConsultarCita';
//import mascotas
import MascotaRegistrar from "./paginas/proyecto/formularios/MascotaRegistrar";
import MascotaConsultar from './paginas/proyecto/mascotas/consultaMascota';
import MascotaActualizar from './paginas/actualizacion/actualizarMascota';

import ProtectedRoute from './ProtectedRoute';
//import productos
import ProductoRegistrar from './paginas/proyecto/formularios/RegistrarProducto';
function App(){
  

  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />}/>
        <Route path='/IndexVeterinaria' element={<IndexVeterinaria/>}/>
        <Route path="/Usuario/Registro" element={<UsuarioRegistro/>}/>
        <Route path="/Usuario/Registro2" element={<UsuarioRegistro2/>}/>
        <Route path="/Usuario/Consultar" element={<ProtectedRoute roles={[1]}  ><UsuarioConsultar/></ProtectedRoute>}/>
        <Route path='/Usuario/Perfil'   element={<DetallesPerfil/>}/>
        <Route path="/Cita/Consultar"   element={<ProtectedRoute roles={[1]}> <CitaConsultar/> </ProtectedRoute> }/>
        <Route path="/Cita/Registrar"   element={<CitaRegistrar/>}/>

        <Route path='/Cita/Consultar/Vet' element={<ConsultarCitas/>}/>
        <Route path="/Mascota/Consultar"element={<ProtectedRoute roles={[1]}><MascotaConsultar/> </ProtectedRoute>}/>
        <Route path="/Mascota/Registrar"element={<MascotaRegistrar/>}/>
        <Route path='/Usuario/Actualizar' element={<ActualizarUsuario/>}/>
        <Route path='/Mascota/Actualizar/:id' element ={<MascotaActualizar/>}/>
        <Route path='/Producto/Registrar' element={<ProductoRegistrar/>} />


      </Routes>
    </Router>
    </AuthProvider>
    

  );
}
export default App;