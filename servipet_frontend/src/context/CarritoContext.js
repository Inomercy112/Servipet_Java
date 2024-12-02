
import { createContext, useContext, useEffect, useState } from "react";




const CarritoContext = createContext();



export function CarritoProvider({ children }) {
    const [carrito, setCarrito] = useState(() => {
      const carritoGuardado = localStorage.getItem("carrito");
      return carritoGuardado ? JSON.parse(carritoGuardado) : [];
    });
  
    useEffect(() => {
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }, [carrito]);
  
    const agregarAlCarrito = (producto) => {
      setCarrito((prevCarrito) => {
        const productoExistente = prevCarrito.find((p) => p.idDto === producto.idDto);
        if (productoExistente) {
          return prevCarrito.map((p) =>
            p.idDto === producto.idDto ? { ...p, cantidad: p.cantidad + 1 } : p
          );
        } else {
          return [...prevCarrito, { ...producto, cantidad: 1 }];
        }
      });
    };
  
    const eliminarDelCarrito = (productoId) => {
      setCarrito((prevCarrito) => prevCarrito.filter((prod) => prod.idDto !== productoId));
    };
  
    const actualizarCantidad = (productoId, nuevaCantidad) => {
      setCarrito((prevCarrito) =>
        prevCarrito.map((prod) =>
          prod.idDto === productoId ? { ...prod, cantidad: nuevaCantidad } : prod
        )
      );
    };
  
    return (
      <CarritoContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito, actualizarCantidad }}>
        {children}
      </CarritoContext.Provider>
    );
  }
  
  export const useCarrito = () => useContext(CarritoContext);
  