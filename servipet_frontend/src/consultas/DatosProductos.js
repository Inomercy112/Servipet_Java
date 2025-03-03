const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const DatosProductos = async(token)=>{
    try{
        const response = await fetch(`${backendUrl}/producto/Consultar/${localStorage["id"]}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            },
        });
        if(!response.ok){
            throw new Error('Error en la consulta: '+ response.status);
        }
        return await response.json();
    }catch(error){
        console.error("error de servidor en la consulta de productos"+ error);
    }
}