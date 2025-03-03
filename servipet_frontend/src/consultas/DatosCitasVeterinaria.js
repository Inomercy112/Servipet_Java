const backendUrl = process.env.REACT_APP_BACKEND_URL;
export const DatosCitasVeterinaria =async (token)=>{
    try {
        const response = await fetch(`${backendUrl}/cita/Consultar/Veterinaria/${localStorage['id']}`,{
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
        console.error('Error al consultar las  Citas', error);
        throw error;
    }
};