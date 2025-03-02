import { gql } from "@apollo/client";

export const GET_PRODUCTOS_CATEGORIA = gql`
  query GetProductoByCategoria($categoria: String!) {
    getProductoByCategoria(categoriasNombresDto: $categoria) {
      idDto
      imagenProductoDto
      nombreProductoDto
      descripcionProductoDto
      precioProductoDto
      cantidadProductoDto
      categoriasNombresDto
      duenoProductoDto
    }
  }
`;
