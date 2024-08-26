import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './index.css';
import Home from './paginas/Home';
import Login from './paginas/proyecto/formularios/Login';
import RegistroUsuario from "./paginas/proyecto/formularios/RegistroUsuario";


function App(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/Usuario/Registro" element={<RegistroUsuario/>}/>

  
      </Routes>
   
    </Router>
    

  );
}
export default App;