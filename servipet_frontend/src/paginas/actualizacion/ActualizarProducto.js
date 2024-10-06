import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import PlantillaTres from "../../componentes/PlantillaTres";
import { DatosCategoria } from "../../consultas/DatosCategoria";
import { DatosProductosEsp } from "../../consultas/DatosEspecificosProducto";

const ActualizarProducto = () => {
    const { id } = useParams();
    const { token } = useAuth();
    const navegar = useNavigate();
    const [Categoria, setCategoria] = useState([]);
    const [formData, setProducto] = useState({
        imagenProducto: "",
        nombreProducto: "",
        descripcionProducto: "",
        precioProducto: "",
        cantidadProducto: "",
        categorias: [],
    });


    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        const cargarProductos = async () => {
            try {
                const productos = await DatosProductosEsp(token, id);
                setProducto(
                    productos || {
                        imagenProducto: "",
                        nombreProducto: "",
                        descripcionProducto: "",
                        precioProducto: "",
                        cantidadProducto: "",
                        categorias: [],
                    }
                );
                if (productos && productos.imagenProducto) {
                    setPreviewImage(`data:image/jpeg;base64,${productos.imagenProducto}`);
                }
            } catch (error) {
                console.error("error al cargar el producto", error);
            }
        };
        cargarProductos();
    }, [token, id]);

    useEffect(() => {
        const CargarCategorias = async () => {
            try {
                const data = await DatosCategoria(token);
                setCategoria(Array.isArray(data) ? data : [data]);
            } catch (error) {
                console.error("error al cargar las categorias");
            }
        };
        CargarCategorias();
    }, [token]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch(`http://localhost:8080/producto/Actualizar/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(formData),
                }
            );
            if(response.ok){
                alert("Datos actualizdos de producto");
                navegar("/Producto/Consultar")
            }
        }
        catch(error) {
            console.error("Error al actualizar el producto", error);
        }
    }

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value, files, type, options } = e.target;
        if (type === "file") {
            const file = files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64Data = reader.result.split(",")[1];
                    setProducto((prevState) => ({
                        ...prevState,
                        imagenProducto: base64Data,
                    }));
                    setPreviewImage(reader.result);
                };
                reader.readAsDataURL(file);
            }
        } else if (options) {
            const selectedOptions = Array.from(options)
                .filter((option) => option.selected)
                .map((option) => ({ id: option.value }));
            setProducto((prevState) => ({
                ...prevState,
                [name]: selectedOptions,
            }));
        } else {
            setProducto((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    return (
        <PlantillaTres>
            <div className="container mt-5">
                <h2>Modificar Producto</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="nombreProducto" className="form-label">
                            Nombre:
                        </label>
                        <input
                            type="text"
                            id="nombreProducto"
                            className="form-control"
                            name="nombreProducto"
                            onChange={handleChange}
                            value={formData.nombreProducto}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="descripcion" className="form-label">
                            Descripción:
                        </label>
                        <textarea
                            id="descripcion"
                            className="form-control"
                            onChange={handleChange}
                            name="descripcionProducto"
                            value={formData.descripcionProducto}
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="precio" className="form-label">
                            Precio:
                        </label>
                        <input
                            type="text"
                            id="precio"
                            className="form-control"
                            onChange={handleChange}
                            name="precioProducto"
                            value={formData.precioProducto}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cantidad" className="form-label">
                            Cantidad:
                        </label>
                        <input
                            type="text"
                            id="cantidad"
                            className="form-control"
                            onChange={handleChange}
                            name="cantidadProducto"
                            value={formData.cantidadProducto}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="categorias" className="form-label">
                            Categorías:
                        </label>
                        <select
                            className="form-select"
                            id="categorias"
                            name="categorias"
                            multiple
                            onChange={handleChange}
                            value={formData.categorias.map((categoria) => categoria.id)}
                            required
                        >
                            <option value="" disabled>
                                Selecciona una o más categorías
                            </option>
                            {Categoria.map((categorias) => (
                                <option key={categorias.id} value={categorias.id}>
                                    {categorias.nombreCategoria}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="imagenProducto" className="form-label">
                            Imagen del Producto
                        </label>
                        {previewImage && (
                            <div className="mb-3">
                                <img
                                    src={previewImage}
                                    alt="Imagen del Producto"
                                    style={{ width: "200px", height: "auto" }}
                                />
                            </div>
                        )}
                        <input
                            type="file"
                            className="form-control"
                            id="imagenProducto"
                            name="imagenProducto"
                            accept="image/*"
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-dark">
                        Guardar Cambios
                    </button>
                </form>
            </div>
        </PlantillaTres>
    );
};

export default  ActualizarProducto;
