import { gql } from "@apollo/client";

export const GET_PRODUCTOS_COMBINADOS = gql`
  query GetProductosCombinados($filtro: String!) {
    porCategoria: getProductoByCategoria(categoriasNombresDto: $filtro) {
      idDto
      imagenProductoDto
      nombreProductoDto
      descripcionProductoDto
      precioProductoDto
      cantidadProductoDto
      categoriasNombresDto
      duenoProductoDto
    }
    porNombre: getproductoByNombre(nombreProductoDto: $filtro) {
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
`;