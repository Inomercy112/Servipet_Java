import { gql } from "@apollo/client";
export const REGISTRAR_RESPUESTA = gql`
  mutation RegistrarRespuesta($respuesta: RespuestaInput!) {
    registrarRespuesta(respuesta: $respuesta) {
      idDto
      descripcionDto
      fechaCreacionDto
      horaCreacionDto
      idPreguntaDto {
        idDto
      }
    }
  }
`;
