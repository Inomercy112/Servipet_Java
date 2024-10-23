import { gql } from "@apollo/client";
export const GET_PRODUCTOS = gql`
    query GetProductos {
        getproductos {
            id
            imagenProducto
            descripcionProducto
            precioProducto
            cantidadProducto
            nombreProducto
        }
    }
`;