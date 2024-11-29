import { useQuery } from "@apollo/client";
import React from "react";
import PlantillaUno from "../../../componentes/PlantillaUno";
import { GET_PRODUCTOS } from "../../../querys/productosQuery";
import ProductoCard from "./ProductoCard";
const ConsultarProductoUsuario = () =>{
  const {loading, error, data} = useQuery(GET_PRODUCTOS);
  if(loading) return <p>Cargando...</p>
  if(error) return <p>Error: {error.message}</p>
  return(
  <section>
    <PlantillaUno>

    <ProductoCard productos={data.getproductos}>
      
    </ProductoCard>
    </PlantillaUno>
  </section>
  
  )
}
export default ConsultarProductoUsuario;
