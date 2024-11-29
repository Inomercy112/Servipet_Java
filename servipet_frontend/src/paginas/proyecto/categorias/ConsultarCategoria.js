import React, { useState } from 'react';
import PlantillaUno from '../../../componentes/PlantillaUno';

const ConsultarCategoria = () => {
    const [categoria, setCategoria] = useState('');  

    const mostrarModal = () => {
        const modal = new window.bootstrap.Modal(document.getElementById('cambioNombreModal'));
        modal.show();
    };

    // Función para confirmar la eliminación de una categoría
    const confirmarCancelacion = async () => {
        if (window.confirm('¿Seguro que quieres eliminar esta categoría?')) {
            alert('Este servicio está deshabilitado por el momento');
        }
    };

    // Función para manejar el cambio del nombre de la categoría
    const handleChangeNombreCategoria = (e) => {
        setCategoria(e.target.value);
    };

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
                    <tbody>
                        <tr>
                            <td>Juguetes</td>
                            <td>
                                <button onClick={mostrarModal} className="btn btn-link">
                                <i className="bi bi-pencil-square"></i>
                                </button>
                                <button onClick={confirmarCancelacion} className="btn btn-link">
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="container mt-3">
                <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#agregarCategoriaModal">
                    Agregar nueva categoría
                </button>
            </div>

            {/* Modal para agregar nueva categoría */}
            <div className="modal fade" id="agregarCategoriaModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Agregar nueva categoría</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="nombreCategoria" className="form-label">Nombre de la categoría:</label>
                                    <input type="text" className="form-control" id="nombreCategoria" required />
                                </div>
                                <button type="submit" className="btn btn-dark">Guardar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal para cambiar nombre de la categoría */}
            <div className="modal fade" id="cambioNombreModal" tabIndex="-1" aria-labelledby="cambioNombreModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="cambioNombreModalLabel">Cambio de nombre</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <label htmlFor="nombreCategoria" className="form-label">Nuevo nombre de la categoría:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nombreCategoria"
                                value={categoria} // Valor ligado al estado
                                onChange={handleChangeNombreCategoria} // Maneja el cambio del valor
                                required
                            />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Guardar cambios</button>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
        </PlantillaUno>
    );
};

export default ConsultarCategoria;
