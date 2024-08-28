import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './index.css';



import Home from './paginas/Home';
import Login from './paginas/proyecto/formularios/Login';
import RegistroUsuario from "./paginas/proyecto/formularios/RegistroUsuario";
import ConsultarUsuario from './paginas/proyecto/usuario/consultarUsuario';
import RegistroUsuario2 from "./paginas/proyecto/formularios/RegistroUsuario2";
import DetallesPerfil  from './paginas/proyecto/usuario/detallesPerfil';
import ConsultarCita from './paginas/proyecto/citas/historialCita';
import CitaRegistrar from './paginas/proyecto/formularios/formulario_cita.blade.php';
function App(){
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/Usuario/Registro" element={<RegistroUsuario/>}/>
        <Route path="/Usuario/Consultar"element={<ConsultarUsuario/>}/>
        <Route path="/Usuario/Registro2" element={<RegistroUsuario2/>}/>
        <Route path='/Usuario/Perfil' element={<DetallesPerfil/>}/>
        <Route path="/Cita/Consultar" element={<ConsultarCita/>}/>
  
      </Routes>
   
    </Router>
    

  );
}
export default App;