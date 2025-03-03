
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
      // Verificamos que la cantidad sea al menos 1 antes de agregarlo al carrito
      if (producto.cantidaProductodDto <= 0) {
        console.error("La cantidad debe ser al menos 1");
        return; // No agregamos el producto al carrito si la cantidad es menor que 1
      }
    
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
    const limpiarCarrito = () => {
      setCarrito([]);  // Limpia el carrito en el estado
      localStorage.removeItem("carrito");  // Elimina el carrito del localStorage
    };
    
  
    return (
      <CarritoContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito, actualizarCantidad, limpiarCarrito }}>
        {children}
      </CarritoContext.Provider>
    );
  }
  
  export const useCarrito = () => useContext(CarritoContext);
  