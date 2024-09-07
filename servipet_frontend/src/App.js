import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './index.css';


//import paginas
import Home from './paginas/Home';
import Login from './paginas/proyecto/formularios/Login';
//import usuarios
import UsuarioRegistro from "./paginas/proyecto/formularios/RegistroUsuario";
import UsuarioRegistro2 from "./paginas/proyecto/formularios/RegistroUsuario2";
import UsuarioConsultar from './paginas/proyecto/usuario/consultarUsuario';
import DetallesPerfil from './paginas/proyecto/usuario/detallesPerfil';

//import citas
import CitaConsultar from './paginas/proyecto/citas/historialCita';
import CitaRegistrar from './paginas/proyecto/formularios/RegistroCita';
//import mascotas
import MascotaRegistrar from "./paginas/proyecto/formularios/MascotaRegistrar";
import MascotaConsultar from './paginas/proyecto/mascotas/consultaMascota';

function App(){
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/Usuario/Registro" element={<UsuarioRegistro/>}/>
        <Route path="/Usuario/Consultar"element={<UsuarioConsultar/>}/>
        <Route path="/Usuario/Registro2" element={<UsuarioRegistro2/>}/>
        <Route path='/Usuario/Perfil' element={<DetallesPerfil/>}/>
        <Route path="/Cita/Consultar" element={<CitaConsultar/>}/>
        <Route path="/Cita/Registrar" element={<CitaRegistrar/>}/>
        <Route path="/Mascota/Consultar" element={<MascotaConsultar/>}/>
        <Route path="/Mascota/Registrar" element={<MascotaRegistrar/>}/>
  
      </Routes>
   
    </Router>
    

  );
}
export default App;