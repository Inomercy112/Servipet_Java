import React, { useState } from 'react'; // Importa useState para manejar el estado
import { Link } from "react-router-dom";
import PlantillaUno from '../../../componentes/PlantillaSeis';
import { GET_PREGUNTAS_Y_RESPUESTAS_POR_VENDEDOR } from '../../../querys/PreguntasPorVendedor';
import { useQuery } from '@apollo/client';
import moment from 'moment';  // Usamos 'moment' para formatear fechas
import { FaReply } from 'react-icons/fa'; // Importa un ícono de "Responder" (puedes usar cualquier ícono de tu preferencia)

const Veterinario = () => {
  const [respuestaAbierta, setRespuestaAbierta] = useState(null); // Estado para controlar qué pregunta tiene el espacio de respuesta abierto
  const [respuestaTexto, setRespuestaTexto] = useState(''); // Estado para almacenar el texto de la respuesta

  console.log(localStorage["id"]);
  const { data, loading, error } = useQuery(GET_PREGUNTAS_Y_RESPUESTAS_POR_VENDEDOR, {
    variables: {
      idVendedor: `${localStorage["id"]}`, // ID del vendedor obtenido del localStorage
    },
  });

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Accede a las preguntas
  const preguntas = data?.getPreguntasPorProductoYVendedor || [];

  // Función para manejar el clic en el ícono de "Responder"
  const toggleRespuesta = (idPregunta) => {
    if (respuestaAbierta === idPregunta) {
      setRespuestaAbierta(null); // Cierra el espacio de respuesta si ya está abierto
    } else {
      setRespuestaAbierta(idPregunta); // Abre el espacio de respuesta para la pregunta seleccionada
    }
    setRespuestaTexto(''); // Limpia el texto de la respuesta al abrir o cerrar
  };

  // Función para manejar el envío de la respuesta (aquí puedes agregar la lógica para enviar la respuesta al servidor)
  const enviarRespuesta = (idPregunta) => {
    console.log(`Respuesta enviada para la pregunta ${idPregunta}:`, respuestaTexto);
    // Aquí puedes agregar la lógica para enviar la respuesta al servidor
    setRespuestaAbierta(null); // Cierra el espacio de respuesta después de enviar
    setRespuestaTexto(''); // Limpia el texto de la respuesta
  };

  return (
    <PlantillaUno title="ServiPet - Veterinario">
      <section>
        <div className="row">
          <div className="col-sm-4 mb-3 mb-sm-0">
            <Link to="/Cita/Consultar/Vet" className="nav-link" style={{ textDecoration: "none" }}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Citas</h5>
                  <p className="card-text">¡Aquí puedes observar y agendar tus citas!</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-sm-5">
            <Link to="/Producto/Consultar" className="nav-link" style={{ textDecoration: "none" }}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Productos</h5>
                  <p className="card-text">¡Aquí puedes consultar y registrar tus productos!</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <section className="container my-5">
          {preguntas.length === 0 ? (
            <p>No hay preguntas para mostrar.</p>
          ) : (
            preguntas.map((pregunta) => (
              <div key={pregunta.idDto} className="card w-75 mb-3">
                <div className="card-body">
                  {/* Mostrar el nombre y la imagen del producto */}
                  {pregunta.productoDto && (
                    <div className="d-flex align-items-center mb-3">
                      <img 
                        src={`data:image/png;base64,${pregunta.productoDto.imagenProductoDto}` }
                        
                        alt={pregunta.productoDto.nombreProductoDto} 
                        style={{ width: '50px', height: '50px', marginRight: '10px' }}
                      />

                      <h5 className="card-title">{pregunta.productoDto.nombreProductoDto}</h5>
                    </div>
                  )}
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="card-subtitle mb-2">Preguntas:</h6>
                    <FaReply 
                      style={{ cursor: 'pointer' }} 
                      onClick={() => toggleRespuesta(pregunta.idDto)} 
                    />
                  </div>
                  <p className="card-text">{pregunta.descripcionDto}</p>
                  <p className="card-text">
                    <small>
                      Fecha: {moment(pregunta.fechaCreacionDto).format('DD/MM/YYYY')} - Hora: {pregunta.horaCreacionDto}
                    </small>
                  </p>
                  {/* Espacio para responder */}
                  {respuestaAbierta === pregunta.idDto && (
                    <div className="mt-3">
                      <textarea
                        className="form-control mb-2"
                        rows="3"
                        placeholder="Escribe tu respuesta..."
                        value={respuestaTexto}
                        onChange={(e) => setRespuestaTexto(e.target.value)}
                      />
                      <button 
                        className="btn btn-primary"
                        onClick={() => enviarRespuesta(pregunta.idDto)}
                      >
                        Enviar Respuesta
                      </button>
                    </div>
                  )}
                  {/* Verifica si hay respuestas para esta pregunta */}
                  {pregunta.respuestasDto && pregunta.respuestasDto.length > 0 ? (
                    <div>
                      <h6 className="card-subtitle mb-2 text-muted">Respuestas:</h6>
                      {pregunta.respuestasDto.map((respuesta) => (
                        <div key={respuesta.idDto} className="card mb-2">
                          <div className="card-body">
                            <p className="card-text">{respuesta.descripcionDto}</p>
                            <p className="card-text">
                              <small>
                                Fecha: {moment(respuesta.fechaCreacionDto).format('DD/MM/YYYY')} - Hora: {respuesta.horaCreacionDto}
                              </small>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No hay respuestas para esta pregunta.</p>
                  )}
                </div>
              </div>
            ))
          )}
        </section>
      </section>
    </PlantillaUno>
  );
};

export default Veterinario;