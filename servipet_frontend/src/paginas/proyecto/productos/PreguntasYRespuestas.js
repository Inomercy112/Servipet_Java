import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GET_PREGUNTAS_Y_RESPUESTAS_POR_PRODUCTO } from "../../../querys/preguntasPorProductoQuery";
import { REGISTRAR_PREGUNTA } from "../../../querys/registrarPreguntasMutation";
const PreguntasRespuestas = ({ idProducto }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [nuevaPregunta, setNuevaPregunta] = useState("");
  const { data, loading, error, refetch } = useQuery(GET_PREGUNTAS_Y_RESPUESTAS_POR_PRODUCTO, {
    variables: { idProducto },
  });

  const [registrarPregunta] = useMutation(REGISTRAR_PREGUNTA, {
    onCompleted: () => {
      refetch();
      setNuevaPregunta("");
    },
    onError: (error) => {
      console.error("Error al registrar la pregunta:", error);
    },
  });
  

  const handlePreguntaSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { state: { from: location }, replace: true });
      
    }
    if (nuevaPregunta.trim()) {
      registrarPregunta({
        variables: {
          pregunta: {
            idProductoDto: idProducto,
            idUsuarioDto: localStorage["id"],
            descripcionDto: nuevaPregunta,
            fechaCreacionDto: new Date().toISOString().split("T")[0],
            horaCreacionDto: new Date().toISOString().split("T")[1].split(".")[0],
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