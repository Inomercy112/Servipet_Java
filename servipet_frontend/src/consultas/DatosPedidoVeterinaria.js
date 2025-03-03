
const backendUrl = process.env.REACT_APP_BACKEND_URL;
export const DatosPedidoVeterinaria = async(id, token) =>{
    try {
        console.log(id)
        console.log(token)
        const response = await fetch(`${backendUrl}/pedido/Consultar/Veterinaria/${id}`, {
            method : "GET",
            headers : {
                "Content-type" : "application/json",
                "Authorization" : `Bearer ${token}`,
                'ngrok-skip-browser-warning': 'true'
            }
        })
        if(response.ok){
            return await response.json();
        }
    }catch(e){
        console.log("error en las consultas" + e);
    }
}