import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { useAuth } from "../../../AuthContext";
import PlantillaUno from "../../../componentes/PlantillaUno";
import { DatosCitas } from "../../../consultas/DatosCitas";
import Datatables from "../../../datatables/datatables";
function ConsultarCitas ()  {
  const [citas, setCitas] = useState([]);
  const aplicarDT = useRef(null);
  const [diagnostico, setDiagnostico] = useState("");
  const [selectedCitaId, setSelectedCitaId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() =>{
    const cargarCitas = async () =>{
        try{
            const data = await DatosCitas(token);
            setCitas(Array.isArray(data) ? data : [data]);
        } catch (error){
            console.error("Error al cargar las citas", error);
        }

    };
    cargarCitas();
}, [token]);
  const handleAceptarCita = async (idCita) => {
    try {
      await fetch(`http://localhost:8080/cita/aceptar/${idCita}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        });
      alert("La cita ha sido aceptada.");
      setCitas((prev) => prev.filter((cita) => cita.id !== idCita));
    } catch (error) {
      console.error('Error al aceptar la cita:', error);
    }
  };

  const handleCancelarCita = async (idCita) => {
    if (window.confirm("¿Seguro que quieres cancelar la cita?")) {
      try {
        await fetch(`http://localhost:8080/cita/cancelar/${idCita}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        alert("La cita ha sido cancelada.");
        setCitas((prev) => prev.filter((cita) => cita.id !== idCita));
      } catch (error) {
        console.error('Error al cancelar la cita:', error);
      }
    }
  };

  const handleAbrirModalDiagnostico = (idCita) => {
    setSelectedCitaId(idCita);
    setDiagnostico("");
    setShowModal(true);
  };
  

  const handleGuardarDiagnostico = async () => {
    console.log('Diagnóstico a guardar:', diagnostico);
    try {
        const response = await fetch(`http://localhost:8080/cita/actualizar/diagnostico/${selectedCitaId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ diagnostico }),
        });

        if (!response.ok) {
            const errorData = await response.text(); 
            alert(`Error: ${errorData || 'No se pudo guardar el diagnóstico'}`);
            throw new Error('Error en la respuesta del servidor');
        }

        const responseData = await response.text(); 
        alert(responseData); 
        setShowModal(false);
        setDiagnostico("");
    } catch (error) {
        console.error('Error al guardar el diagnóstico:', error);
        alert('Hubo un problema al guardar el diagnóstico.');
    }
};
useEffect(() => {
  if (citas.length > 0) {
      Datatables(aplicarDT);
  }
  else{
      
  }
}, [citas]);


  
const [tempFechaHora, setTempFechaHora] = useState({});

const handleChange = (idCita, field, value) => {
  setTempFechaHora((prev) => ({
    ...prev,
    [idCita]: { ...prev[idCita], [field]: value },
  }));
};

const handleActualizarFechaHora = async (idCita) => {
  const { fecha, hora } = tempFechaHora[idCita] || {};
  if (!fecha || !hora) {
    alert('Por favor, selecciona fecha y hora.');
    return;
  }

  setLoading(true);
  try {
    await fetch(`http://localhost:8080/cita/actualizar/fechaHora/${idCita}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`,},
      body: JSON.stringify({ fecha, hora }),
    });
    alert('Fecha y hora actualizadas');
  } catch (error) {
    console.error('Error al actualizar la cita:', error);
  }
  setLoading(false);
};

return (
  <PlantillaUno>
    <div className="container mt-5">
      <h2>Citas</h2>
      <table ref={aplicarDT} className="display">
        <thead>
          <tr>
            <th>Nombre Cliente</th>
            <th>Asunto</th>
            <th>Diagnóstico</th>
            <th>Nombre Mascota</th>
            <th>Estado de cita</th>
            <th>Acciones</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {citas.map((cita) => (
            <tr key={cita.id}>
              <td>{cita.quienAsiste.nombreUsuario}</td>
              <td>{cita.razon}</td>
              <td>{cita.diagnostico}</td>
              <td>
                <a href={`/Cita/MascotaAsiste/${cita.mascotaAsiste.id}`}>
                  {cita.mascotaAsiste.nombreMascota}
                </a>
              </td>
              <td>{cita.estadoCita.nombreEstadoCita}</td>
              <td>
                <Button variant="success" onClick={() => handleAceptarCita(cita.id)}>
                  <i className="bi bi-check"></i>
                </Button>
                <Button variant="danger" onClick={() => handleCancelarCita(cita.id)}>
                  <i className="bi bi-x"></i>
                </Button>
                <Button variant="info" onClick={() => handleAbrirModalDiagnostico(cita.id)}>
                  <i className="bi bi-card-checklist"></i>
                </Button>
              </td>
              <td>
                <Form.Control
                  type="date"
                  defaultValue={cita.fechaCita}
                  onChange={(e) => handleChange(cita.id, 'fecha', e.target.value)}
                />
              </td>
              <td>
                <Form.Control
                  type="time"
                  defaultValue={cita.horaCita}
                  onChange={(e) => handleChange(cita.id, 'hora', e.target.value)}
                />
              </td>
              <td>
                <Button disabled={loading} onClick={() => handleActualizarFechaHora(cita.id)}>
                  Actualizar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>



      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Diagnóstico</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Control
          as="textarea"
          rows={4}
          value={diagnostico}
          onChange={(e) => setDiagnostico(e.target.value)} 
        />

        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={() => {
          setShowModal(false); 
          setDiagnostico(""); 
        }}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleGuardarDiagnostico}>
          Guardar
        </Button>
      </Modal.Footer>
      </Modal>
    </div>
    </PlantillaUno>
  );
};

export default ConsultarCitas;
