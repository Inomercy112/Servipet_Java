import { useEffect, useState } from "react";
import PlantillaUno from "../../../componentes/PlantillaUno";
import { DatosVeterinaira } from "../../../consultas/DatosVeterinarias";
import { useAuth } from "../../../context/AuthContext";
import CitaCard from "./CitaCard";

const ListadoVeterinarias = () => {
    const [veterinarias, setVeterinarias] = useState([]);  // Asegurar que es un array
    const { token } = useAuth();

    useEffect(() => {
        const ListarVeterinaria = async () => {
            try {
                const response = await DatosVeterinaira(token);
                setVeterinarias(Array.isArray(response) ? response : []);
            } catch (e) {
                console.error("Error al cargar las veterinarias", e);
                setVeterinarias([]);  // En caso de error, aseguramos que siga siendo un array
            }
        };
        ListarVeterinaria();
    }, [token]);

    return (
        <PlantillaUno>
            <CitaCard veterinarias={veterinarias} />
        </PlantillaUno>
    );
};

export default ListadoVeterinarias;
