// En tu archivo de querys (por ejemplo, preguntasQuery.js)
import { gql } from "@apollo/client";

// Consulta para obtener las preguntas de un producto
export const GET_PREGUNTAS_Y_RESPUESTAS_POR_PRODUCTO = gql`
  query GetPreguntasPorProducto($idProducto: String!) {
    getPreguntasPorProducto(idProducto: $idProducto) {
      idDto
    idProductoDto
    idUsuarioDto
    descripcionDto
    fechaCreacionDto
    horaCreacionDto
    respuestasDto {
      idDto
      idUsuarioDto
      descripcionDto
      fechaCreacionDto
      horaCreacionDto
    }
    }
  }
`;

