import { gql } from "@apollo/client";

export const GET_PRODUCTOS_ESPECIFICO = gql`
    query GetProductoById($id : ID!) {
        getproductoById(id: $id){
            id
            imagenProducto
            descripcionProducto
            precioProducto
            cantidadProducto
            nombreProducto
        }
    }
`;
