import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import PlantillaUno from "../../../componentes/PlantillaUno";
import { DatosCitasVeterinaria } from "../../../consultas/DatosCitasVeterinaria";
import { useAuth } from "../../../context/AuthContext";
import Datatables from "../../../datatables/datatables";

function ConsultarCitas() {
  const today = new Date().toISOString().split("T")[0];
  const [citas, setCitas] = useState([]);
  const aplicarDT = useRef(null);
  const [diagnostico, setDiagnostico] = useState("");
  const [selectedCitaId, setSelectedCitaId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navegar = useNavigate();

  const { token } = useAuth();

  useEffect(() => {
    const cargarCitas = async () => {
      try {
        const data = await DatosCitasVeterinaria(token);
        setCitas(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error("Error al cargar las citas", error);
      }
    };
    cargarCitas();
  }, [token]);

  const handleAceptarCita = async (idCita) => {
    try {
      await fetch(`http://localhost:8080/cita/Aceptar/${idCita}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      alert("La cita ha sido aceptada.");
      navegar(0);
    } catch (error) {
      console.error('Error al aceptar la cita:', error);
    }
  };

  const handleCancelarCita = async (idCita) => {
    if (window.confirm("¿Seguro que quieres cancelar la cita?")) {
      try {
        await fetch(`http://localhost:8080/cita/Cancelar/${idCita}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        alert("La cita ha sido cancelada.");
        navegar(0);
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
    try {
      const response = await fetch(`http://localhost:8080/cita/Actualizar/Diagnostico/${selectedCitaId}`, {
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
      } else {
        navegar(0);
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
  }, [citas]);

  const [tempFechaHora, setTempFechaHora] = useState({});

  const handleChange = (idCita, field, value) => {
    setTempFechaHora((prev) => ({
      ...prev,
      [idCita]: { ...prev[idCita], [field]: value },
    }));
  };

  const handleActualizarFechaHora = async (idCita) => {
    const { fechaCitaDto, horaCitaDto } = tempFechaHora[idCita] || {};
    if (!fechaCitaDto || !horaCitaDto) {
      alert('Por favor, selecciona fecha y hora.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/cita/Actualizar/FechaHora/${idCita}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ fechaCitaDto, horaCitaDto }),
      });
      if (response.ok) {
        alert("Hora y fecha actualizada");
      }
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
              <tr key={cita.idDto}>
                <td>{cita.quienAsisteDto}</td>
                <td>{cita.razonDto}</td>
                <td>{cita.diagnosticoDto || "en vista"}</td>
                <td>
                  <a href={`/Cita/MascotaAsiste/${cita.mascotaAsisteDto.idDto}`}>
                    {cita.mascotaAsisteDto.nombreMascotaDto}
                  </a>
                </td>
                <td>{cita.estadoCitaDto.nombreEstadoCitaDto}</td>
                <td>
                  <Button variant="success" onClick={() => handleAceptarCita(cita.idDto)}>
                    <i className="bi bi-check"></i>
                  </Button>
                  <Button variant="danger" onClick={() => handleCancelarCita(cita.idDto)}>
                    <i className="bi bi-x"></i>
                  </Button>
                  <Button
                    variant="info"
                    onClick={() => handleAbrirModalDiagnostico(cita.idDto)}
                    disabled={cita.estadoCitaDto.nombreEstadoCitaDto !== "Aceptada"}
                  >
                    <i className="bi bi-card-checklist"></i>
                  </Button>
                </td>
                <td>
                  <Form.Control
                    type="date"
                    min={today}
                    defaultValue={cita.fechaCitaDto}
                    onChange={(e) => handleChange(cita.idDto, 'fechaCitaDto', e.target.value)}
                    disabled={cita.estadoCitaDto.nombreEstadoCitaDto !== "Aceptada"}
                  />
                </td>
                <td>
                  <Form.Control
                    type="time"
                    defaultValue={cita.horaCitaDto}
                    onChange={(e) => handleChange(cita.idDto, 'horaCitaDto', e.target.value)}
                    disabled={cita.estadoCitaDto.nombreEstadoCitaDto !== "Aceptada"}
                  />
                </td>
                <td>
                  <Button
                    disabled={loading || cita.estadoCitaDto.nombreEstadoCitaDto !== "Aceptada"}
                    onClick={() => handleActualizarFechaHora(cita.idDto)}
                  >
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
}

export default ConsultarCitas;