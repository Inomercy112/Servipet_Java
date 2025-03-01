import React, { useContext, useState } from 'react';
import { Alert, Button, Form, Modal } from 'react-bootstrap'; // Mantén la importación
import { useNavigate } from 'react-router-dom';
import PlantillaUno from '../../../componentes/PlantillaUno';
import { useAuth } from '../../../context/AuthContext';
import { CategoriaContext } from '../../../context/CategoriaContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ConsultarCategoria = () => {
    const { categoria } = useContext(CategoriaContext);
    const [selectedCategoriaid, setSelectedCategoriaId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null); // Estado para manejar mensajes de error
    const { token } = useAuth();
    const navegar = useNavigate();

    const validationSchema = Yup.object({
        nombreCategoriaDto: Yup.string()
            .required("El nombre de la categoría es obligatorio")
            .matches(/^[^0-9]*$/, "El nombre no debe contener números")
            .test(
                "no-mas-de-dos-caracteres-seguidos",
                "No puede haber más de 2 caracteres iguales seguidos",
                (value) => {
                    if (!value) return true;
                    for (let i = 0; i < value.length - 2; i++) {
                        if (value[i] === value[i + 1] && value[i] === value[i + 2]) {
                            return false;
                        }
                    }
                    return true;
                }
            ),
    });

    const formikRegistro = useFormik({
        initialValues: {
            nombreCategoriaDto: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await fetch("http://localhost:8080/categoria/Registrar", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify(values),
                });
                if (response.ok) {
                    setErrorMessage(null); // Limpia el mensaje de error
                    alert("Categoría registrada con éxito");
                    formikRegistro.resetForm();
                    setShowModal2(false);
                    navegar(0);
                } else {
                    setErrorMessage("Error al registrar la categoría"); // Muestra un mensaje de error
                }
            } catch (e) {
                setErrorMessage("Ocurrió un error al registrar la categoría: " + e); // Muestra un mensaje de error
            }
        },
    });

    const confirmarCancelacion = (id, nombre) => {
        const confirmar = window.confirm("¿Seguro que desea eliminar la categoría " + nombre + "?");
        if (confirmar) {
            try {
                fetch(`http://localhost:8080/categoria/Eliminar/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });
                alert("Categoría " + nombre + " eliminada");
                navegar(0);
            } catch (e) {
                setErrorMessage("Ocurrió un problema: " + e); // Muestra un mensaje de error
            }
        }
    };

    const handleAbrirModalActualizacion = (id) => {
        setSelectedCategoriaId(id);
        setShowModal(true);
    };

    const handleActualizarCategoria = async () => {
        try {
            const response = await fetch(`http://localhost:8080/categoria/Actualizar/${selectedCategoriaid}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ nombreCategoriaDto: formikRegistro.values.nombreCategoriaDto }),
            });
            if (response.ok) {
                setErrorMessage(null); // Limpia el mensaje de error
                alert("Categoría actualizada");
                setShowModal(false);
                formikRegistro.resetForm();
                navegar(0);
            } else {
                setErrorMessage("Error al actualizar la categoría"); // Muestra un mensaje de error
            }
        } catch (e) {
            setErrorMessage("Ocurrió un error inesperado: " + e); // Muestra un mensaje de error
        }
    };

    return (
        <PlantillaUno>
            <>
                {/* Mostrar mensajes de error */}
                {errorMessage && (
                    <Alert variant="danger" onClose={() => setErrorMessage(null)} dismissible>
                        {errorMessage}
                    </Alert>
                )}

                <div className="container">
                    <h2>Lista de Categorías</h2>
                    <table id="productosTable" className="table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categoria.map((categorias) => (
                                <tr key={categorias.idDto}>
                                    <td>{categorias.nombreCategoriaDto}</td>
                                    <td>
                                        <Button onClick={() => handleAbrirModalActualizacion(categorias.idDto)} className="btn btn-link">
                                            <i className="bi bi-pencil-square"></i>
                                        </Button>
                                        <Button onClick={() => confirmarCancelacion(categorias.idDto, categorias.nombreCategoriaDto)} className="btn btn-link">
                                            Eliminar
                                            <i className="bi bi-trash"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="container mt-3">
                    <Button className="btn btn-dark" onClick={() => setShowModal2(true)}>
                        Agregar nueva categoría
                    </Button>
                </div>

                {/* Modal para agregar nueva categoría */}
                <Modal show={showModal2} onHide={() => { setShowModal2(false); formikRegistro.resetForm(); }}>
                    <Modal.Body>
                        <Modal.Header>
                            <Modal.Title>Agregar nueva categoría</Modal.Title>
                            <Button
                                onClick={() => { setShowModal2(false); formikRegistro.resetForm(); }}
                                className="btn-close"
                            ></Button>
                        </Modal.Header>
                        <Form onSubmit={formikRegistro.handleSubmit}>
                            <Form.Group>
                                <div className="mb-3">
                                    <Form.Label>Nombre de la categoría:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="nombreCategoriaDto"
                                        value={formikRegistro.values.nombreCategoriaDto}
                                        onChange={formikRegistro.handleChange}
                                        onBlur={formikRegistro.handleBlur}
                                        isInvalid={formikRegistro.touched.nombreCategoriaDto && !!formikRegistro.errors.nombreCategoriaDto}
                                    />
                                    {formikRegistro.touched.nombreCategoriaDto && formikRegistro.errors.nombreCategoriaDto ? (
                                        <Form.Control.Feedback type="invalid">
                                            {formikRegistro.errors.nombreCategoriaDto}
                                        </Form.Control.Feedback>
                                    ) : null}
                                </div>
                                <Button type="submit" className="btn btn-dark">
                                    Guardar
                                </Button>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                </Modal>

                {/* Modal para cambiar nombre de la categoría */}
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cambio de nombre</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="nombreCategoria">
                            <Form.Label>Nuevo nombre de la categoría:</Form.Label>
                            <Form.Control
                                type="text"
                                value={formikRegistro.values.nombreCategoriaDto}
                                onChange={formikRegistro.handleChange}
                                required
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => { setShowModal(false); formikRegistro.resetForm(); }}>
                            Cerrar
                        </Button>
                        <Button variant="primary" onClick={handleActualizarCategoria}>
                            Guardar cambios
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        </PlantillaUno>
    );
};

export default ConsultarCategoria;