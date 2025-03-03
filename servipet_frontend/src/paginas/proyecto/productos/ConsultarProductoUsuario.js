import { useQuery } from "@apollo/client";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import PlantillaCinco from "../../../componentes/PlantillaCinco";
import { GET_PRODUCTOS_COMBINADOS } from "../../../querys/ProductosCategoriaNombre";
import ProductoCard from "./ProductoCard";

const ConsultarProductoUsuario = () => {
  const { id } = useParams();
  const [priceRange, setPriceRange] = useState(0);
  
  // 1. Consulta combinada
  const { data } = useQuery(GET_PRODUCTOS_COMBINADOS, {
    variables: { filtro: id },
    fetchPolicy: 'network-only',
  });

  // 2. Combinar resultados correctamente
  const productos = useMemo(() => {
    if (!data) return [];
    return [...(data.porNombre || []), ...(data.porCategoria || [])];
  }, [data]);

  // 3. Calcular precio máximo
  const maxPrice = useMemo(() => {
    return productos.length > 0 
      ? Math.max(...productos.map(p => p.precioProductoDto || 0))
      : 0;
  }, [productos]);

  // 4. Filtrado por rango
  const filteredProductos = useMemo(() => {
    return productos.filter(p => p.precioProductoDto <= priceRange);
  }, [productos, priceRange]);

  // 5. Efecto para inicializar priceRange
  useEffect(() => {
    if (maxPrice > 0) {
      setPriceRange(maxPrice);
    }
  }, [maxPrice]);

  return (
    <section className="d-flex">
      <PlantillaCinco
        productos={filteredProductos}
        priceRange={priceRange}
        maxPrice={maxPrice}
        onPriceChange={setPriceRange}
      >
        <ProductoCard productos={filteredProductos} />
      </PlantillaCinco>
    </section>
  );
};
export default ConsultarProductoUsuario;
