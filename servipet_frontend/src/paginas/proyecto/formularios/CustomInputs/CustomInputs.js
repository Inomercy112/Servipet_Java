// src/componentes/CustomFields.js
import { ErrorMessage, Field, } from "formik";
import React, { useState } from "react";
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export const CustomInput = ({ label, name, type = "text" }) => (
    <div className="mb-3">
        <label className="form-label">{label}</label>
        <Field type={type} className="form-control" name={name} />
        <ErrorMessage name={name} component="div" className="text-danger" />
    </div>
);

export const CustomTextarea = ({ label, name, rows = 3 }) => (
    <div className="mb-3">
        <label className="form-label">{label}</label>
        <Field as="textarea" className="form-control" name={name} rows={rows} />
        <ErrorMessage name={name} component="div" className="text-danger" />
    </div>
);

export const CustomSelect = ({ label, name, options, multiple = false }) => (
    <div className="mb-3">
        <label className="form-label">{label}</label>
        <Field as="select" className="form-select" name={name} multiple={multiple}>
            {(options || []).map((opt) => (
                <option key={opt.idDto} value={opt.nombreCategoriaDto}>
                    {opt.nombreCategoriaDto}
                </option>
            ))}
        </Field>
        <ErrorMessage name={name} component="div" className="text-danger" />
    </div>
);




export const CustomFileInput = ({ setFieldValue }) => {
    const [preview, setPreview] = useState(null); // Estado para almacenar la vista previa de la imagen

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (!file) {
            alert("No se seleccionó ningún archivo.");
            return;
        }

        if (file.size > MAX_IMAGE_SIZE) {
            alert("El archivo no puede superar los 5MB.");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            if (!reader.result) {
                alert("Error al leer la imagen.");
                return;
            }

            // Extraer solo la parte base64 de la imagen
            const base64String = reader.result.split(",")[1];

            setFieldValue("imagenProductoDto", base64String);
            setPreview(reader.result); // Guardar la vista previa en el estado
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="mb-3">
            <label className="form-label">Imagen del Producto</label>
            <input type="file" className="form-control" accept="image/*" onChange={handleImageChange} />
            <ErrorMessage name="imagenProductoDto" component="div" className="text-danger" />
            
            {/* Mostrar la vista previa de la imagen si está cargada */}
            {preview && (
                <div className="mt-3">
                    <img src={preview} alt="Vista previa" className="img-thumbnail" style={{ maxWidth: "200px" }} />
                </div>
            )}
        </div>
    );
};


