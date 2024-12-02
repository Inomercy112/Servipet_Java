export const DatosProductos = async(token)=>{
    try{
        const response = await fetch(`http://localhost:8080/producto/Consultar/${localStorage['id']}`,{
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
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