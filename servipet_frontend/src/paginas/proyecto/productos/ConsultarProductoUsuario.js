import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import PlantillaUno from "../../../componentes/PlantillaUno";
import { GET_PRODUCTOS_CATEGORIA } from "../../../querys/preguntasPorCategoriaQuery";
import { GET_PRODUCTOS_NOMBRE } from "../../../querys/preguntasPorNombres";
import ProductoCard from "./ProductoCard";

const ConsultarProductoUsuario = () => {
  const { id } = useParams();
  const itemwhithoutspace = id.replace(/\s+/g, "-");
  console.log(itemwhithoutspace);
  const { loading: loadingCategoria, error: errorCategoria, data: dataCategoria } = useQuery(GET_PRODUCTOS_CATEGORIA, {
    variables: { categoria: id },
  });

  const { loading: loadingNombre, error: errorNombre, data: dataNombre } = useQuery(GET_PRODUCTOS_NOMBRE, {
    variables: { nombre: itemwhithoutspace },
  });

  if (loadingCategoria || loadingNombre) return <p>Cargando...</p>;
  if (errorCategoria || errorNombre) return <p>Error: {errorCategoria?.message || errorNombre?.message}</p>;

  const productos =
  (dataNombre?.getproductoByNombre?.length > 0 
    ? dataNombre.getproductoByNombre 
    : dataCategoria?.getProductoByCategoria) || [];
;
  return (
    <section>
      <PlantillaUno>
        <ProductoCard productos={productos} />
      </PlantillaUno>
    </section>
  );
};

export default ConsultarProductoUsuario;
