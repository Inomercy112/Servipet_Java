import { gql } from "@apollo/client";

export const REGISTRAR_PREGUNTA = gql`
  mutation RegistrarPregunta($pregunta: PreguntaInput!) {
    registrarPregunta(pregunta: $pregunta) {
      idDto
      idProductoDto
      idUsuarioDto
      descripcionDto
      fechaCreacionDto
      horaCreacionDto
      respuestasDto {
        idDto
        idPreguntaDto {
          idDto
        }
        idUsuarioDto
        descripcionDto
        fechaCreacionDto
        horaCreacionDto
      }
    }
  }
`;
