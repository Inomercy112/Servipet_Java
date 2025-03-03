
const backendUrl = process.env.REACT_APP_BACKEND_URL;
export const DatosPedidoUsuario = async(id, token) =>{
    try {
        const response = await fetch(`${backendUrl}/pedido/Consultar/Usuario/${id}`, {
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