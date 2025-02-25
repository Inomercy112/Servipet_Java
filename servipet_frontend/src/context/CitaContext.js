import React, { createContext, useContext, useState } from 'react';

// Crear el contexto
const CitaContext = createContext();

// Hook personalizado para acceder al contexto
export const useCitaContext = () => useContext(CitaContext);

// Proveedor del contexto
export const CitaProvider = ({ children }) => {
  const [cita, setCita] = useState(null); // Estado para almacenar la información de la cita

  // Función para actualizar la cita
  const setCitaDetails = (nombreVeterinaria, horariosAtencion) => {
    setCita({ nombreVeterinaria, horariosAtencion });
  };

  return (
    <CitaContext.Provider value={{ cita, setCitaDetails }}>
      {children}
    </CitaContext.Provider>
  );
};

