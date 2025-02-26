import { gql } from "@apollo/client";
export const REGISTRAR_PREGUNTA = gql`
  mutation RegistrarPregunta($pregunta: PreguntaInput!) {
    registrarPregunta(pregunta: $pregunta) {
      id
      pregunta
      respuesta
    }
  }
`;