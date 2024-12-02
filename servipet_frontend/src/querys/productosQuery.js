import { gql } from "@apollo/client";
export const GET_PRODUCTOS = gql`
    query GetProductos {
        getproductos {
            idDto
            imagenProductoDto
            descripcionProductoDto
            precioProductoDto
            cantidadProductoDto
            nombreProductoDto
            categoriasNombresDto
        }
    }
`;