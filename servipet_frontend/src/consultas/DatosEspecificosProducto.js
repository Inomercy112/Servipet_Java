const backendUrl = process.env.REACT_APP_BACKEND_URL;
export const DatosProductosEsp =async (token, id)=>{

    try {
        const response = await fetch(`${backendUrl}/producto/Consultar/esp/${id}`,{
            method: 'GET',
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if(!response.ok){
            throw new Error('Error en la consulta: '+ response.status);
        }
        return await response.json();
    }catch(error){
  
        console.error('Error al consultar las mascotas', error);
        throw error;
    }
};