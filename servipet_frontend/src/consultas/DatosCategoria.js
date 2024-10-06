export const DatosCategoria = async (token) => {
    try {
        const response = await fetch("http://localhost:8080/categoria/Consultar",{
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type' : "application/json"
            },
        });
        if(!response.ok) {
            throw new Error("Error en la consulta"+response.status);
        }
        return await response.json();

    }
    catch(error){
        console.error("error en la consulta de categorias", error);
    }
}
