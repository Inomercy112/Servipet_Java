export const DatosDomicilioUsuario = async(id, token) =>{
    try {
        const response = await fetch(`http://localhost:8080/datosDomicilio/Consultar/${id}`, {
            method : "GET",
            headers : {
                "Content-type" : "application/json",
                "Authorization" : `Bearer ${token}`
            }
        })
        if(response.ok){
            return await response.json();
        }
    }catch(e){
        console.log("error en las consultas" + e);
    }
}