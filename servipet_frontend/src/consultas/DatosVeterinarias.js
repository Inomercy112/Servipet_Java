export const DatosVeterinaira = async (token) =>{
    try{
        const response = await fetch("http://localhost:8080/usuario/Consultar/Veterinaria",{
            method :"GET",
            headers:{
                "Content-type" : "application/json",
                "Authorization" : `Bearer ${token}`
            }
        })
        if(response.ok){
            return await response.json();
        }
    }catch(e){
        console.log("error en la consulta de veterinarias ", e);
    }
}