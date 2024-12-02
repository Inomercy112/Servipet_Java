import { useEffect, useState } from "react";
import PlantillaUno from "../../../componentes/PlantillaUno";
import { DatosVeterinaira } from "../../../consultas/DatosVeterinarias";
import { useAuth } from "../../../context/AuthContext";
import CitaCard from "./CitaCard";
const ListadoVeterinarias = () => {
    const [Veterinaria , setVeterinaria] = useState([]);
    const {token} = useAuth();
    useEffect(() => {
        const ListarVeterinaria = async() => {
            try{
                const response = await DatosVeterinaira(token);
                setVeterinaria(Array.isArray(response)? response : [response]);
            }catch(e){
                console.error("error al cargar las citas ", e);
            }
        };
        ListarVeterinaria();
    }, [token]);

    return (
        <PlantillaUno>
            <CitaCard veterinarias={Veterinaria} >

            </CitaCard>
        </PlantillaUno>
    )
}
export default ListadoVeterinarias;