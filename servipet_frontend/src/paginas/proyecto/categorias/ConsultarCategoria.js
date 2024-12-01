import React, { useContext, useState } from 'react';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PlantillaUno from '../../../componentes/PlantillaUno';
import { useAuth } from '../../../context/AuthContext';
import { CategoriaContext } from '../../../context/CategoriaContext';

const ConsultarCategoria = () => {
    const { categoria } = useContext(CategoriaContext);
    const [nombreCategoriaDto, setNombre] = useState("");
    const [selectedCategoriaid, setSelectedCategoriaId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const { token } = useAuth();
    const navegar = useNavigate();
    // Función para confirmar la eliminación de una categoría
    const confirmarCancelacion = (id, nombre) => {
        const confirmar = window.confirm("seguro que desea eliminar la categoria " + nombre +" ?")
        if(confirmar){
            try{
                fetch(`http://localhost:8080/categoria/Eliminar/${id}`,{
                    method: "DELETE",
                    headers: {
                        "Content-type" : "application/json",
                        "Authorization" : `Bearer ${token}`
                    },
                })
                    alert("categoria " + nombre +" eliminada");
                    navegar(0);
                

            }catch (e){
                Alert("ocurrio un problema " + e);
            }
        }
    };
    const handleAbrirModalRegistro = () =>{
        setShowModal2(true);
    }
    const handleGuardarCategoria = async () =>{
        try{
            const response = await fetch("http://localhost:8080/categoria/Registrar",{
                method : "POST",
                headers :{
                    "Content-type" : "application/json",
                    "Authorization" : `Bearer ${token}`
                },
                body : JSON.stringify({nombreCategoriaDto})
            });
            if(response.ok){
                alert("Categoria registrada con exito");
                setNombre("");
                setShowModal2(false);
                navegar(0);
            }
        } catch(e){
            setShowModal2(false);
            alert("A ocurrido un error al registra la categoria" + e);
        }
    }

    // Función para manejar el cambio del nombre de la categoría
    const handleAbrirModalActualizacion = (id) => {
        setSelectedCategoriaId(id);
        setNombre("");
        setShowModal(true);
    };
    const handleActualizarCategoria = async() =>{
        try{
            const response = await fetch(`http://localhost:8080/categoria/Actualizar/${selectedCategoriaid}`,{
                method: "PUT",
                headers :{
                    "Content-type" : "application/json",
                    "Authorization" : `Bearer ${token}`,
                },
                body: JSON.stringify({nombreCategoriaDto}),
            });
            if(response.ok){
                alert("categoria actualizada");
                setShowModal(false);
                setNombre("");
                navegar(0);
            }
        }catch(e){
            setShowModal(false);
            alert("ocurrio un error inesperado " + e);
        }
    }

    return (
        <PlantillaUno>
            <>
                <div className="container">
                    <h2>Lista de Categorías</h2>
                    <table id="productosTable" className="table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>{categoria.map(categorias => (
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
                    <Button className="btn btn-dark" onClick={() => handleAbrirModalRegistro()} >
                        Agregar nueva categoría
                    </Button>
                </div>

                {/* Modal para agregar nueva categoría */}
                <Modal show={showModal2}  onHide={()=> {setShowModal2(false); setNombre("")}} >
                    <Modal.Body>
                            <Modal.Header>
                                <Modal.Title>Agregar nueva categoría</Modal.Title>
                                <Button
                                onClick={() =>{ setShowModal2(false)
                                    setNombre("");
                                }}
                                className="btn-close"
                                ></Button>
                            </Modal.Header>
                            <div>
                                <Form.Group>
                                    <div className="mb-3">
                                        <Form.Label>Nombre de la categoría:</Form.Label>
                                        <Form.Control
                                        type="text"
                                        value={nombreCategoriaDto}
                                        onChange={(e)=> setNombre(e.target.value)}
                                        id="nombreCategoria"
                                        required />
                                    </div>
                                    <Button 
                                    className="btn btn-dark"
                                    onClick={ handleGuardarCategoria}
                                    >Guardar
                                    </Button>
                                </Form.Group>
                            </div>
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
                                value={nombreCategoriaDto}
                                onChange={(e)=>setNombre(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" 
                        onClick={() => {setShowModal(false)
                            setNombre("");
                        }}>
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
