import { createContext, useEffect, useState } from "react";

export const CategoriaContext = createContext();
export const CategoriaProvider = ({ children }) => {
    const [categoria, setCategoria] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await fetch("http://localhost:8080/categoria/Consultar", {
                    method: "GET",
                    headers: {
                        'Content-Type': "application/json"
                    },
                });
                if (!response.ok) {
                    throw new Error("Error en la consulta " + response.status);
                }
                const data = await response.json();
                setCategoria(Array.isArray(data)? data : [data]);
            }
            catch (error) {
                console.error("error en la consulta de categorias ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategorias();
    }, []);
    return (
        <CategoriaContext.Provider value={{ categoria, loading }}>
            {children}
        </CategoriaContext.Provider>
    )
}