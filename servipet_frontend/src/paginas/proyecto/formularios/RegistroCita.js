import React from "react";
import PlantillaTres from "../../../componentes/PlantillaTres";

function RegistroCita(){
    return(
    <PlantillaTres>
    <body>
        
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="mb-4">Formulario de Citas</h2>
                    <form  >
                        <div className="mb-3">
                            <label htmlFor="descripcion" className="form-label">Descripción:</label>
                            <textarea id="descripcion" name="descripcion" className="form-control" required></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="fecha_cita" className="form-label">Fecha de la Cita:</label>
                            <input type="date" id="fecha_cita" name="fecha_cita" className="form-control" required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="veterinaria" className="form-label">Que mascota asiste</label>
                            <select id="veterinaria" name="veterinaria" className="form-select" required>
                                <option value="" disabled selected>Selecciona tu mascota</option>
                                <option value="veterinaria1">Mascota 1</option>
                                <option value="veterinaria2">Mascota 2</option>
                                <option value="veterinaria3">Mascota 3</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="hora_cita" className="form-label">Hora de la Cita:</label>
                            <input type="time" id="hora_cita" name="hora_cita" className="form-control" required/>
                        </div>
                        <button type="submit" className="btn btn-dark">Programar Cita</button>
                    </form>
                </div>
            </div>
        </div>
    </body>
    </PlantillaTres>
);
}
export default RegistroCita;