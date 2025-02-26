import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { REGISTRAR_PREGUNTA } from "../../../querys/registrarPreguntasMutation";
import { GET_PREGUNTAS_POR_PRODUCTO } from "../../../querys/preguntasPorProductoQuery"
const PreguntasRespuestas = ({ idProducto }) => {
  const [nuevaPregunta, setNuevaPregunta] = useState("");

  // Consulta para obtener las preguntas del producto
  const { data, loading, error, refetch } = useQuery(GET_PREGUNTAS_POR_PRODUCTO, {
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
            idProducto,
            pregunta: nuevaPregunta,
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
          <div key={pregunta.id} className="pregunta-item">
            <p><strong>Pregunta:</strong> {pregunta.pregunta}</p>
            {pregunta.respuesta && (
              <p><strong>Respuesta:</strong> {pregunta.respuesta}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreguntasRespuestas;