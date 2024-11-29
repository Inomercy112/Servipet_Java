
import { createContext, useContext, useEffect, useState } from "react";




const CarritoContext = createContext();



export function CarritoProvider({children}) {
    const [carrito, setCarrito] = useState(() =>{
        const carritoGuardado = localStorage.getItem("carrito");
        return carritoGuardado ? JSON.parse(carritoGuardado) : [];
    });

    useEffect(() =>{
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }, [carrito]);

    const agregarAlcarrito =(producto) => {
        setCarrito((prevCarrito)=> [...prevCarrito,producto]);
    };
    const eliminarDelcarrito = (productoId) =>{
        setCarrito((prevCarrito)=> prevCarrito.filter(prod => prod.idDto !== productoId))
    };
    return (
        <CarritoContext.Provider value={{carrito, agregarAlcarrito , eliminarDelcarrito}}>
            {children}
            </CarritoContext.Provider>
    )
}

export const useCarrito = () => useContext (CarritoContext);