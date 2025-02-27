import { createContext, useEffect, useState } from "react";

export const CategoriaContext = createContext();
export const CategoriaProvider = ({ children }) => {
    const [categoria, setCategoria] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const storedCategorias = localStorage.getItem("categorias");
                const storedTimestamp = localStorage.getItem("categoriasTimestamp");
                
                const now = new Date().getTime();
                const expirationTime = 24 * 60 * 60 * 1000;

                if (storedCategorias && storedTimestamp && now - storedTimestamp < expirationTime) {
                    setCategoria(JSON.parse(storedCategorias));
                    setLoading(false);
                    return;
                }
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
                const categoriasArray = Array.isArray(data) ? data : [data];

                setCategoria(categoriasArray);
                localStorage.setItem("categorias", JSON.stringify(categoriasArray));
                localStorage.setItem("categoriasTimestamp", now);
            } 
            catch (error) {
                console.error("Error en la consulta de categorías:", error);
            } 
            finally {
                setLoading(false);
            }
        };

        fetchCategorias();
    }, []);

    return (
        <CategoriaContext.Provider value={{ categoria, loading }}>
            {children}
        </CategoriaContext.Provider>
    );
};
