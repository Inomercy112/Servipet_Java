import React, { useContext, useState } from 'react';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PlantillaUno from '../../../componentes/PlantillaUno';
import { useAuth } from '../../../context/AuthContext';
import { CategoriaContext } from '../../../context/CategoriaContext';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ConsultarCategoria = () => {
    const { categoria } = useContext(CategoriaContext);
    const [selectedCategoriaid, setSelectedCategoriaId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const { token } = useAuth();
    const navegar = useNavigate();

    // Esquema de validación con Yup
    const categoriaSchema = Yup.object().shape({
        nombreCategoriaDto: Yup.string()
            .required("El nombre de la categoría es obligatorio")
            .matches(/^[A-Za-z\s]+$/, "No se permiten números ni caracteres especiales")
            .test(
                "max-repeated-chars",
                "No se permiten más de 3 caracteres iguales seguidos",
                (value) => !/(.)\1{3,}/.test(value)
            ),
    });

    // Función para confirmar la eliminación de una categoría
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
                Alert("Ocurrió un problema " + e);
            }
        }
    };

    // Función para abrir el modal de registro
    const handleAbrirModalRegistro = () => {
        setShowModal2(true);
    };

    // Función para abrir el modal de actualización
    const handleAbrirModalActualizacion = (id) => {
        setSelectedCategoriaId(id);
        setShowModal(true);
    };

    // Función para guardar una nueva categoría
    const handleGuardarCategoria = async (values) => {
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
                alert("Categoría registrada con éxito");
                setShowModal2(false);
                navegar(0);
            }
        } catch (e) {
            setShowModal2(false);
            alert("Ocurrió un error al registrar la categoría: " + e);
        }
    };

    // Función para actualizar una categoría
    const handleActualizarCategoria = async (values) => {
        try {
            const response = await fetch(`http://localhost:8080/categoria/Actualizar/${selectedCategoriaid}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(values),
            });
            if (response.ok) {
                alert("Categoría actualizada");
                setShowModal(false);
                navegar(0);
            }
        } catch (e) {
            setShowModal(false);
            alert("Ocurrió un error inesperado: " + e);
        }
    };

    return (
        <PlantillaUno>
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
                <Button className="btn btn-dark" onClick={handleAbrirModalRegistro}>
                    Agregar nueva categoría
                </Button>
            </div>

            {/* Modal para agregar nueva categoría */}
            <Modal show={showModal2} onHide={() => setShowModal2(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar nueva categoría</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{ nombreCategoriaDto: "" }}
                        validationSchema={categoriaSchema}
                        onSubmit={handleGuardarCategoria}
                    >
                        {({ handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="nombreCategoria">
                                    <Form.Label>Nombre de la categoría:</Form.Label>
                                    <Field
                                        type="text"
                                        name="nombreCategoriaDto"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="nombreCategoriaDto"
                                        component="div"
                                        className="text-danger"
                                    />
                                </Form.Group>
                                <Button type="submit" className="btn btn-dark mt-3">
                                    Guardar
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>

            {/* Modal para cambiar nombre de la categoría */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Cambio de nombre</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{ nombreCategoriaDto: "" }}
                        validationSchema={categoriaSchema}
                        onSubmit={handleActualizarCategoria}
                    >
                        {({ handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="nombreCategoria">
                                    <Form.Label>Nuevo nombre de la categoría:</Form.Label>
                                    <Field
                                        type="text"
                                        name="nombreCategoriaDto"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="nombreCategoriaDto"
                                        component="div"
                                        className="text-danger"
                                    />
                                </Form.Group>
                                <Button type="submit" className="btn btn-primary mt-3">
                                    Guardar cambios
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </PlantillaUno>
    );
};

export default ConsultarCategoria;