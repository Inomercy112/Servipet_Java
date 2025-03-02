import { createContext, useEffect, useState } from "react";

export const CategoriaContext = createContext();
const backendUrl = process.env.REACT_APP_BACKEND_URL;
export const CategoriaProvider = ({ children }) => {
    const [categoria, setCategoria] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await fetch(`${backendUrl}/categoria/Consultar`, {
                    method: "GET",
                    headers: {
                        'Content-Type': "application/json",
                        'Cache-Control': 'no-cache'
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