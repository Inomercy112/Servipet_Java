import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { GET_PREGUNTAS_Y_RESPUESTAS_POR_PRODUCTO } from "../../../querys/preguntasPorProductoQuery";
import { REGISTRAR_PREGUNTA } from "../../../querys/registrarPreguntasMutation";
const PreguntasRespuestas = ({ idProducto }) => {
  console.log(idProducto + "id del producto en preguntas")
  const [nuevaPregunta, setNuevaPregunta] = useState("");

  // Consulta para obtener las preguntas del producto
  const { data, loading, error, refetch } = useQuery(GET_PREGUNTAS_Y_RESPUESTAS_POR_PRODUCTO, {
    variables: { idProducto },
  });

  // Mutación para registrar una nueva pregunta
  const [registrarPregunta] = useMutation(REGISTRAR_PREGUNTA, {
    onCompleted: () => {
      refetch(); // Refrescar la lista de preguntas después de registrar una nueva
      setNuevaPregunta(""); // Limpiar el campo de texto
    },
    onError: (error) => {
      console.error("Error al registrar la pregunta:", error);
    },
  });

  const handlePreguntaSubmit = (e) => {
    e.preventDefault();
    if (nuevaPregunta.trim()) {
      registrarPregunta({
        variables: {
          pregunta: {
            idProductoDto: idProducto,  // ✅ Nombre correcto según el esquema
            idUsuarioDto: localStorage["id"], // Reemplaza con el ID real del usuario
            descripcionDto: nuevaPregunta,
            fechaCreacionDto: new Date().toISOString().split("T")[0], // YYYY-MM-DD
            horaCreacionDto: new Date().toISOString().split("T")[1].split(".")[0], // HH:mm:ss
          },
        },
      });
      
    }
  };

  if (loading) return <p>Cargando preguntas...</p>;
  if (error) return <p>Error al cargar las preguntas: {error.message}</p>;

  const preguntas = data?.getPreguntasPorProducto || [];

  return (
    <div className="preguntas-respuestas">
      <h4>Preguntas y respuestas</h4>
      <form onSubmit={handlePreguntaSubmit} className="mb-3">
        <input
          type="text"
          value={nuevaPregunta}
          onChange={(e) => setNuevaPregunta(e.target.value)}
          placeholder="Escribe tu pregunta..."
          className="form-control"
        />
        <button type="submit" className="btn btn-primary mt-2">
          Preguntar
        </button>
      </form>

      <div className="preguntas-lista">
  {preguntas.map((pregunta) => (
    <div key={pregunta.idDto} className="pregunta-item">
      <p><strong>Pregunta:</strong> {pregunta.descripcionDto}</p>
      {Array.isArray(pregunta.respuestasDto) && pregunta.respuestasDto.length > 0 && (
        <div className="respuestas-lista">
          {pregunta.respuestasDto.map((respuesta) => (
            <p key={respuesta.idDto}><strong>Respuesta:</strong> {respuesta.descripcionDto}</p>
          ))}
        </div>
      )}
    </div>
  ))}
</div>


    </div>
  );
};

export default PreguntasRespuestas;