import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useCitaContext } from "../../../context/CitaContext";
import { DatosMascota } from "../../../consultas/DatosMascota";
import { useAuth } from "../../../context/AuthContext";
import PlantillaTres from "../../../componentes/PlantillaTres";
const backendUrl = process.env.REACT_APP_BACKEND_URL;


const RegistroCita = () => {
    const { id } = useParams();
  
  const { cita } = useCitaContext();
  console.log(cita)
  const { token } = useAuth();
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const [Mascota, setMascota] = useState([]);

  useEffect(() => {
    const CargarMascotas = async () => {
      try {
        const data = await DatosMascota(token);
        setMascota(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error("Error al cargar las mascotas");
      }
    };
    CargarMascotas();
  }, [token]);

  const initialValues = {
    razonDto: "",
    fechaCitaDto: "",
    mascotaAsisteDto: { idDto: "" },
    horaCitaDto: "",
    estadoCitaDto: { idDto: 2 },
    quienAsisteDto: localStorage["id"],
    quienAtiendeDto: id,
    estadoCDto: 1,
  };

  const validationSchema = Yup.object({
    razonDto: Yup.string()
      .min(10, "La descripción debe tener al menos 10 caracteres")
      .max(100, "La descripción no puede tener más de 100 caracteres")
      .required("La descripción es obligatoria")
      .matches(
        /^(?!.*([a-zA-Z0-9])\1{2,}).{10,100}$/,
        "La descripción no puede tener más de 2 caracteres consecutivos iguales"
      ),
    fechaCitaDto: Yup.date()
      .min(today, "La fecha no puede ser anterior a hoy")
      .required("La fecha es obligatoria")
      .test("diaDisponible", "Este día no está disponible", function (value) {
        const selectedDate = new Date(value);
        const selectedDay = selectedDate.toLocaleString("es-ES", { weekday: "long" }); // Formato en español

        // Validar si 'cita' y 'horarioAtencionDto' están definidos
        if (!cita || !cita.horariosAtencion) {
          return false;
        }

        // Buscar el horario correspondiente al día seleccionado
        const horario = cita.horariosAtencion.find((horario) => horario.diaDto === selectedDay);
        console.log("dia seleccionado " + selectedDay)

        // Si el horario está cerrado o no tiene horarios definidos, retorna false
        if (!horario || horario.cerrado || !horario.aperturaDto || !horario.cierreDto) {
          return false;
        }

        // La fecha es válida si tiene apertura y cierre definidos
        return true;
      })
      .test("horaDisponible", "La hora no está disponible", function (value) {
        const { horaCitaDto, fechaCitaDto } = this.parent; // Obtenemos la hora y fecha desde el formulario
      
        // Verificar que horaCitaDto y fechaCitaDto tengan un valor antes de proceder
        if (!horaCitaDto || !fechaCitaDto) {
          return false;
        }
        console.log("horacitaDto " + horaCitaDto);
      
        // Asegúrate de que horaCitaDto tenga dos dígitos
        const formattedHoraCita = horaCitaDto.padStart(5, "0"); // Ej: '2:03' se convierte en '02:03'
      
        // Convertir fechaCitaDto en el formato correcto (YYYY-MM-DD)
        const formattedFechaCita = new Date(fechaCitaDto).toISOString().split("T")[0]; // Solo la parte de la fecha
      
        // Crear la cadena de fecha y hora correctamente
        const selectedTimeString = `${formattedFechaCita}T${formattedHoraCita}:00`;
        console.log("Cadena de fecha y hora: ", selectedTimeString);
      
        // Intentar crear el objeto Date
        const selectedTime = new Date(selectedTimeString);
      
        // Verificar la fecha y hora resultante
        console.log("Hora seleccionada: ", selectedTime);
      
        // Si la fecha no es válida, lo registramos
        if (isNaN(selectedTime.getTime())) {
          console.error("La fecha y hora seleccionada no es válida.");
          return false; // La validación fallará si la fecha es inválida
        }
      
        // Buscar el horario del día correspondiente
        const selectedDate = new Date(fechaCitaDto);
        const selectedDay = selectedDate.toLocaleString("es-ES", { weekday: "long" });
        const horario = cita.horariosAtencion.find((horario) => horario.diaDto === selectedDay);
        console.log("aperturaDto " + horario.aperturaDto);
        console.log("cierreDto " + horario.cierreDto);
      
        // Si no hay horario o está cerrado, no es válido
        if (!horario || horario.cerrado || !horario.aperturaDto || !horario.cierreDto) {
          console.error("Este día está cerrado o no tiene horarios válidos.");
          return false; // No es válido
        }
      
        // Asegúrate de que las horas de apertura y cierre sean válidas y tengan el formato adecuado
        const aperturaHora = horario.aperturaDto ? horario.aperturaDto.slice(0, 5) : null; // Eliminar segundos
        const cierreHora = horario.cierreDto ? horario.cierreDto.slice(0, 5) : null; // Eliminar segundos
      
        if (!aperturaHora || !cierreHora) {
          console.error("Las horas de apertura o cierre no están definidas correctamente.");
          return false;
        }
      
        // Convertir las horas de apertura y cierre a objetos Date con el formato adecuado
        const apertura = new Date(`${formattedFechaCita}T${aperturaHora}:00`);
        const cierre = new Date(`${formattedFechaCita}T${cierreHora}:00`);
      
        console.log("Hora apertura: ", apertura);
        console.log("Hora cierre: ", cierre);
      
        // Si las horas de apertura o cierre no son válidas, no permitimos la cita
        if (isNaN(apertura.getTime()) || isNaN(cierre.getTime())) {
          console.error("Las horas de apertura o cierre no son válidas.");
          return false; // No es válido
        }
      
        // Verificar si la hora seleccionada está dentro del rango de apertura y cierre
        if (selectedTime >= apertura && selectedTime <= cierre) {
          return true; // La hora seleccionada está dentro del rango
        } else {
          console.error("La hora seleccionada no está dentro del horario de atención.");
          return false; // La hora seleccionada no está dentro del rango
        }
      })
      
      
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(`${backendUrl}/cita/Registrar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        alert("Se registró correctamente la cita");
        navigate("/Cita/Consultar");
      } else {
        alert("Ocurrió un problema!!!");
      }
    } catch (error) {
      console.error("Ocurrió un problema con las citas", error);
    }
    setSubmitting(false);
  };

  if (!cita) {
    return <div>No se ha seleccionado ninguna veterinaria.</div>;
  }

  return (
    <PlantillaTres title="Registro Cita">
      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card2 shadow p-4">
              <h2>Agendar cita con {cita.nombreVeterinaria}</h2>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="mb-3">
                      <label htmlFor="razon" className="form-label">Descripción:</label>
                      <Field as="textarea" id="razon" name="razonDto" className="form-control" />
                      <ErrorMessage name="razonDto" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="fechaCita" className="form-label">Fecha de la Cita:</label>
                      <Field type="date" id="fechaCita" name="fechaCitaDto" min={today} className="form-control" />
                      <ErrorMessage name="fechaCitaDto" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="mascotaAsiste" className="form-label">Qué mascota asiste</label>
                      <Field as="select" id="mascotaAsiste" name="mascotaAsisteDto.idDto" className="form-select">
                        <option value="" disabled>Selecciona tu mascota</option>
                        {Mascota.map((mascota) => (
                          <option key={mascota.idDto} value={mascota.idDto}>{mascota.nombreMascotaDto}</option>
                        ))}
                      </Field>
                      <ErrorMessage name="mascotaAsisteDto.idDto" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="horaCita" className="form-label">Hora de la Cita:</label>
                      <Field type="time" id="horaCita" name="horaCitaDto" className="form-control" />
                      <ErrorMessage name="horaCitaDto" component="div" className="text-danger" />
                    </div>
                    <button type="submit" className="btn btn-dark" disabled={isSubmitting}>
                      {isSubmitting ? "Registrando..." : "Programar Cita"}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </PlantillaTres>
  );
};

export default RegistroCita;
