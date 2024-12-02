import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlantillaDos from "../../../componentes/PlantillaDos";
const RegistroUsuarioVeterinario = () => {
  const dirigir = useNavigate();

  const [formData, setFormData] = useState({
    imagenUsuarioDto: "",
    nombreUsuarioDto: "",
    correoContactoDto: "",
    correoUsuarioDto: "",
    contrasenaUsuarioDto: "",
    direccionUsuarioDto: "",
    telefonoUsuarioDto: "",
    horarioAtencionDto: "",
    diasDisponiblesDto: [], 
    rolUsuarioDto: "veterinaria",
  });
  const [previewImage, setPreviewImage] = useState([]);
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
  
    if (type === "file") {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          // Convierte la imagen seleccionada a formato Base64
          const base64Data = reader.result.split(',')[1];
  
          // Actualiza el estado con la imagen en Base64
          setFormData((prevState) => ({
            ...prevState,
            imagenUsuarioDto: base64Data, // Guardamos la imagen en formato Base64
          }));
  
          // Establece la vista previa de la imagen
          setPreviewImage(reader.result);
        };
  
        // Lee el archivo como DataURL (Base64)
        reader.readAsDataURL(file);
      }
    } else {
      // Para otros tipos de campos, solo actualiza el valor como antes
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
  
    setFormData((prevState) => {
      if (checked) {
        return { ...prevState, diasDisponiblesDto: [...prevState.diasDisponiblesDto, value] };
      } else {
        return {
          ...prevState,
          diasDisponiblesDto: prevState.diasDisponiblesDto.filter((dia) => dia !== value),
        };
      }
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Asegúrate de enviar todo como JSON
    const jsonToSend = {
      ...formData,
      // Si necesitas convertir 'diasDisponiblesDto' a un formato JSON correctamente
      diasDisponiblesDto: formData.diasDisponiblesDto,

    };
  
    try {
      const response = await fetch("http://localhost:8080/usuario/Registrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Asegúrate de que el backend esté esperando JSON
        },
        body: JSON.stringify(jsonToSend), // Enviamos los datos como JSON
      });
  
      if (response.ok) {
        alert("Usuario registrado exitosamente");
        dirigir("/Usuario/Consultar");
      } else {
        alert("Error al registrar el usuario");
      }
    } catch (error) {
      console.error("Error al registrar el usuario", error);
    }
  };
  
  
  return (
    <PlantillaDos>
      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-md-6">
          <div className="card2 shadow p-4">
          <h2 className="mb-4">Registro de Usuario</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="nombreVeterinaria" className="form-label">
                    Nombre de la veterinaria:
                  </label>
                  <input
                    type="text"
                    id="nombreVeterinaria"
                    name="nombreUsuarioDto"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.nombreUsuarioDto}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="logo" className="form-label">
                    Logo de la veterinaria:
                  </label>
                  <input
                    type="file"
                    id="logo"
                    name="imagenUsuarioDto"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>
                {previewImage && <img src={previewImage} alt="Vista previa" />}
                <div className="mb-3">
                  <label htmlFor="nombreResponsable" className="form-label">
                    Nombre del responsable:
                  </label>
                  <input
                    type="text"
                    id="nombreResponsable"
                    name="nombreResponsableDto"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.nombreResponsableDto}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="correoContacto" className="form-label">
                    Correo de contacto:
                  </label>
                  <input
                    type="email"
                    id="correoContacto"
                    name="correoContactoDto"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.correoContactoDto}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="correoUsuario" className="form-label">
                    Correo de inicio:
                  </label>
                  <input
                    type="email"
                    id="correoUsuario"
                    name="correoUsuarioDto"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.correoUsuarioDto}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="contrasenaUsuario" className="form-label">
                    Contraseña:
                  </label>
                  <input
                    type="password"
                    id="contrasenaUsuario"
                    name="contrasenaUsuarioDto"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.contrasenaUsuarioDto}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="direccionVeterinaria" className="form-label">
                    Dirección de la veterinaria:
                  </label>
                  <input
                    type="text"
                    id="direccionVeterinaria"
                    name="direccionUsuarioDto"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.direccionUsuarioDto}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="telefono" className="form-label">
                    Teléfono de contacto:
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefonoUsuarioDto"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.telefonoUsuarioDto}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="horariosAtencion" className="form-label">
                    Horarios de atención:
                  </label>
                  <input
                    type="text"
                    id="horariosAtencion"
                    name="horarioAtencionDto"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.horarioAtencionDto}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Días de la semana disponibles:</label>
                  <div>
                    {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((dia, index) => (
                      <div key={index} className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`checkbox-${index}`}
                          value={dia}
                          onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label" htmlFor={`checkbox-${index}`}>
                          {dia}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <button type="submit" className="btn btn-dark">
                    Registrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PlantillaDos>
  );
};

export default RegistroUsuarioVeterinario;
