import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import PlantillaUno from "../../../componentes/PlantillaUno";
import { DatosMascotaEsp } from "../../../consultas/DatosEspecificosMascota";
import { useAuth } from "../../../context/AuthContext";
function DetallesMascota(){
  const { id } = useParams(); 
  const [mascota, setMascota] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();


  useEffect(() => {
    const fetchMascota = async () => {
      try {
        const data = await DatosMascotaEsp(token, id);
        setMascota(data);
      } catch (error) {
        setError("Error al cargar los detalles de la mascota.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMascota();
  }, [id, token]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!mascota) {
    return <div className="alert alert-warning text-center">
    No se encontraron mascotas.
</div>
  }

  return (
    <PlantillaUno>
    <div className="container">
      <h2>Detalles de Mascota</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Nombre de la mascota:</label>
          <input type="text" className="form-control" value={mascota.nombreMascotaDto} readOnly />
        </div>

        <div className="mb-3">
          <label className="form-label">Antecedentes:</label>
          <Form.Control as="textarea" rows={3} 
          value={mascota.antecedentesMascotaDto} 
          readOnly 
            />
        </div>

        <div className="mb-3">
          <label className="form-label">Tipo de mascota:</label>
          <input type="text" className="form-control" value={mascota.tipoMascotaDto.nombreTipoMascotaDto} readOnly />
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha De Nacimiento:</label>
          <input type="text" className="form-control" value={mascota.fechaNacimientoMascotaDto} readOnly />
        </div>

        <div className="mb-3">
          <label className="form-label">Raza:</label>
          <input type="text" className="form-control" value={mascota.razaMascotaDto} readOnly />
        </div>

        <div className="mb-3">
          <label className="form-label">Peso kg:</label>
          <input type="text" className="form-control" value={mascota.pesoMascotaDto} readOnly />
        </div>

      </form>
    </div>
    </PlantillaUno>
  );
};

export default DetallesMascota;
