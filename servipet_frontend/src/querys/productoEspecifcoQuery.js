import { gql } from "@apollo/client";

export const GET_PRODUCTOS_ESPECIFICO = gql`
    query GetProductoById($id : ID!) {
        getproductoById(idDto: $id){
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
