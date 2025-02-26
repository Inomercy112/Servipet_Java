// En tu archivo de querys (por ejemplo, preguntasQuery.js)
import { gql } from "@apollo/client";

// Consulta para obtener las preguntas de un producto
export const GET_PREGUNTAS_POR_PRODUCTO = gql`
  query GetPreguntasPorProducto($idProducto: String!) {
    getPreguntasPorProducto(idProducto: $idProducto) {
      id
      pregunta
      respuesta
    }
  }
`;