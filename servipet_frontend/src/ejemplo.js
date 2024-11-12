import React, { useState } from 'react';
import './style.css';

function Register() {
    // Un solo objeto para manejar todos los campos del formulario
    const [formData, setFormData] = useState({
        userType: 'Docente',
        fullName: '',
        identification: '',
        email: '',
        phone: '',
        password: ''
    });
    
    const [error, setError] = useState(null);

    // Función para manejar el cambio de los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value // Actualiza el campo específico
        }));
    };

    // Funciones de validación
    const validateFullName = (name) => /^[A-Za-z\s]+$/.test(name);
    const validateIdentification = (identification) => /^\d+$/.test(identification);
    const validateEmail = (email) => /^[\w-.]+@([\w-]+\.)+com$/.test(email);
    const validatePhone = (phone) => /^\d{10}$/.test(phone);
    const validatePassword = (password) => /^(?=.[0-9])(?=.[.*]).{8,}$/.test(password);

const handleSubmit =  async(e) => {
    e.preventDefault();

    const { fullName, identification, email, phone, password } = formData;

    // Validación: crea un objeto de errores para cada campo
    let validationErrors = {};

    if (!fullName || !validateFullName(fullName)) {
        validationErrors.fullName = "El nombre completo solo debe contener letras.";
    }

    if (!identification || !validateIdentification(identification)) {
        validationErrors.identification = "La identificación debe contener solo números.";
    }

    if (!email || !validateEmail(email)) {
        validationErrors.email = "Por favor, ingrese un email válido que termine en '.com'.";
    }

    if (!phone || !validatePhone(phone)) {
        validationErrors.phone = "El teléfono debe ser un número de 10 dígitos.";
    }

    if (!password || !validatePassword(password)) {
        validationErrors.password = "La contraseña debe tener al menos 8 caracteres y contener números, puntos o asteriscos.";
    }

    // Si hay errores, los mostramos en el estado de error y detenemos el envío del formulario
    if (Object.keys(validationErrors).length > 0) {
        setError(validationErrors);
        return;
    }

    try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (response.ok) {
                alert('Usuario registrado exitosamente');
            } else {
                alert(result.error);
            }
        } catch (error) {
            alert('Hubo un error al registrar el usuario');
            console.error(error);
        }
        
    console.log("Registro con:", formData);
    setError(null);
};
    return (
        <div className="container register-container">
            <h2>Registrarse</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Tipo de usuario:</label>
                    <select
                        name="userType"
                        value={formData.userType}
                        onChange={handleChange}
                        required
                    >
                        <option value="Docente">Docente</option>
                        <option value="Estudiante">Estudiante</option>
                    </select>
                </div>
                <div>
                    <label>Nombre Completo:</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Identificación:</label>
                    <input
                        type="text"
                        name="identification"
                        value={formData.identification}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Teléfono:</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Elige una contraseña:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
}

export default Register;