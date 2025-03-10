import { CheckOutlined, CloseOutlined, FileTextOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Space, Table, message } from "antd";
import 'antd/dist/reset.css';
import React, { useEffect, useState } from "react";
import PlantillaUno from "../../../componentes/PlantillaUno";
import { DatosCitasVeterinaria } from "../../../consultas/DatosCitasVeterinaria";
import { useAuth } from "../../../context/AuthContext";

function ConsultarCitas() {
  const [citas, setCitas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [selectedCitaId, setSelectedCitaId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [diagnostico, setDiagnostico] = useState("");
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
        method: "PUT",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
      message.success("Cita aceptada");
      setCitas((prev) => prev.map((cita) => (cita.idDto === idCita ? { ...cita, estadoCitaDto: { nombreEstadoCitaDto: "Aceptada" } } : cita)));
    } catch (error) {
      console.error("Error al aceptar cita:", error);
    }
  };

  const handleCancelarCita = async (idCita) => {
    try {
      await fetch(`http://localhost:8080/cita/Cancelar/${idCita}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
      message.warning("Cita cancelada");
      setCitas((prev) =>
        prev.map((cita) =>
          cita.idDto === idCita ? { ...cita, estadoCitaDto: { nombreEstadoCitaDto: "Cancelada" } } : cita
        )
      );
    } catch (error) {
      console.error("Error al cancelar cita:", error);
    }
  };

  const handleGuardarDiagnostico = async () => {
    try {
      await fetch(`http://localhost:8080/cita/Actualizar/Diagnostico/${selectedCitaId}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ diagnostico }),
      });
      message.success("Diagnóstico guardado");
      setShowModal(false);
      setDiagnostico("");
      setCitas((prev) => prev.map((cita) => (cita.idDto === selectedCitaId ? { ...cita, diagnosticoDto: diagnostico } : cita)));
    } catch (error) {
      console.error("Error al guardar diagnóstico:", error);
    }
  };

  const columns = [
    {
      title: "Cliente",
      dataIndex: "quienAsisteDto",
      key: "cliente",
      sorter: (a, b) => a.quienAsisteDto.localeCompare(b.quienAsisteDto),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Buscar cliente"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Button type="primary" onClick={() => confirm()} icon={<SearchOutlined />} size="small" style={{ width: 90 }}>
            Buscar
          </Button>
        </div>
      ),
      onFilter: (value, record) => record.quienAsisteDto.toLowerCase().includes(value.toLowerCase()),
    },
    { title: "Asunto", dataIndex: "razonDto", key: "asunto" },
    { title: "Diagnóstico", dataIndex: "diagnosticoDto", key: "diagnostico", render: (text) => text || "En vista" },
    {
      title: "Mascota",
      dataIndex: "mascotaAsisteDto",
      key: "mascota",
      render: (mascota) => <a href={`/Cita/MascotaAsiste/${mascota.idDto}`}>{mascota.nombreMascotaDto}</a>,
    },
    { title: "Estado", dataIndex: "estadoCitaDto", key: "estado", render: (estado) => estado.nombreEstadoCitaDto },
    {
      title: "Acciones",
      key: "acciones",
      render: (_, record) => (
        <Space>
          <Button type="primary" shape="circle" icon={<CheckOutlined />} onClick={() => handleAceptarCita(record.idDto)} />
          <Button type="danger" shape="circle" icon={<CloseOutlined />} onClick={() => handleCancelarCita(record.idDto)} />
          <Button
            type="default"
            shape="circle"
            icon={<FileTextOutlined />}
            onClick={() => {
              setSelectedCitaId(record.idDto);
              setShowModal(true);
            }}
            disabled={record.estadoCitaDto.nombreEstadoCitaDto !== "Aceptada"}
          />
        </Space>
      ),
    },
  ];

  return (
    <PlantillaUno>
      <div className="container">
        <h2>Consultar Citas</h2>
        <Table columns={columns} dataSource={citas} rowKey="idDto" pagination={{ pageSize: 5 }} />

        {/* Modal para diagnóstico */}
        <Modal title="Agregar Diagnóstico" visible={showModal} onCancel={() => setShowModal(false)} onOk={handleGuardarDiagnostico } centered>
          <Form>
            <Form.Item>
              <Input.TextArea rows={4} value={diagnostico} onChange={(e) => setDiagnostico(e.target.value)} placeholder="Ingrese el diagnóstico" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PlantillaUno>
  );
}

export default ConsultarCitas;
