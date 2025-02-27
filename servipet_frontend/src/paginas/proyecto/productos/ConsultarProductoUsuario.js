import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import PlantillaUno from "../../../componentes/PlantillaUno";
import { GET_PRODUCTOS_CATEGORIA } from "../../../querys/preguntasPorCategoriaQuery";
import ProductoCard from "./ProductoCard";
const ConsultarProductoUsuario = () =>{
  const {id} = useParams();
  console.log(id)
  const {loading, error, data} = useQuery(GET_PRODUCTOS_CATEGORIA
    ,{
      variables: { categoria: id },
  });

  if(loading) return <p>Cargando...</p>
  if(error) return <p>Error: {error.message}</p>
  const productos = data?.getProductoByCategoria || [];

  return(
  <section>
    <PlantillaUno>

    <ProductoCard productos={productos}>
      
    </ProductoCard>
    </PlantillaUno>
  </section>
  
  )
}
export default ConsultarProductoUsuario;
