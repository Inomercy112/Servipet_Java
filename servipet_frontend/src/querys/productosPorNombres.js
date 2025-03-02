import { gql } from "@apollo/client";

export const GET_PRODUCTOS_NOMBRE = gql`
query GetProductoById($nombre : String!){
    getproductoByNombre(nombreProductoDto : $nombre){
        idDto
            imagenProductoDto
            descripcionProductoDto
            precioProductoDto
            cantidadProductoDto
            nombreProductoDto
            categoriasNombresDto
            duenoProductoDto
    }
}
`