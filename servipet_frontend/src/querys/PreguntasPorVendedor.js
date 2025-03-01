import { gql } from "@apollo/client";

// Consulta para obtener las preguntas de un producto y vendedor específico
export const GET_PREGUNTAS_Y_RESPUESTAS_POR_VENDEDOR = gql`
  query GetPreguntasPorProductoYVendedor( $idVendedor: String!) {
    getPreguntasPorProductoYVendedor(idVendedor: $idVendedor) {
    idDto
    idProductoDto
    idUsuarioDto
    descripcionDto
    fechaCreacionDto
    horaCreacionDto
    respuestasDto {
      idDto
      descripcionDto
      fechaCreacionDto
      horaCreacionDto
    }
    productoDto {
      idDto
      imagenProductoDto
      nombreProductoDto
    }
}
  }
`;