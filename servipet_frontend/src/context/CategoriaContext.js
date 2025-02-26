import { createContext, useEffect, useState } from "react";

export const CategoriaContext = createContext();
export const CategoriaProvider = ({ children }) => {
    const [categoria, setCategoria] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                // Verificamos si hay categorías en localStorage
                const storedCategorias = localStorage.getItem("categorias");
                const storedTimestamp = localStorage.getItem("categoriasTimestamp");
                
                const now = new Date().getTime();
                const expirationTime = 24 * 60 * 60 * 1000; // 1 día

                if (storedCategorias && storedTimestamp && now - storedTimestamp < expirationTime) {
                    setCategoria(JSON.parse(storedCategorias)); // Usamos el almacenamiento local
                    setLoading(false);
                    return;
                }

                // Si no hay datos válidos en localStorage, hacemos la petición
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
                localStorage.setItem("categorias", JSON.stringify(categoriasArray)); // Guardamos en localStorage
                localStorage.setItem("categoriasTimestamp", now); // Guardamos el tiempo de la consulta
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
