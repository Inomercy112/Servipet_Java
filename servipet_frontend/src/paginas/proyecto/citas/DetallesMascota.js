import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DatosMascotaEsp } from "../../../consultas/DatosEspecificosMascota";
import { useAuth } from "../../../AuthContext";
import PlantillaUno from "../../../componentes/PlantillaUno";
import { Form } from "react-bootstrap";
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
    return <div>No se encontraron detalles de la mascota.</div>;
  }

  return (
    <PlantillaUno>
    <div className="container">
      <h2>Detalles de Mascota</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Nombre de la mascota:</label>
          <input type="text" className="form-control" value={mascota.nombreMascota} readOnly />
        </div>

        <div className="mb-3">
          <label className="form-label">Antecedentes:</label>
          <Form.Control as="textarea" rows={3} 
           value={mascota.antecedentes} 
           readOnly 
            />
        </div>

        <div className="mb-3">
          <label className="form-label">Tipo de mascota:</label>
          <input type="text" className="form-control" value={mascota.tipo.nombreTipo} readOnly />
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha De Nacimiento:</label>
          <input type="text" className="form-control" value={mascota.fechaNacimientoMascota} readOnly />
        </div>

        <div className="mb-3">
          <label className="form-label">Raza:</label>
          <input type="text" className="form-control" value={mascota.raza} readOnly />
        </div>

        <div className="mb-3">
          <label className="form-label">Peso kg:</label>
          <input type="text" className="form-control" value={mascota.pesoKg} readOnly />
        </div>

       
      </form>
    </div>
    </PlantillaUno>
  );
};

export default DetallesMascota;
