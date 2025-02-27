import { useQuery } from "@apollo/client";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { SearchContext } from "../context/BuscadorContext";
import { GET_PRODUCTOS } from "../querys/productosQuery";

const Buscador = () => {
    const { searchTerm, setSearchTerm } = useContext(SearchContext);
    const { loading, error, data } = useQuery(GET_PRODUCTOS);
    const [showResults, setShowResults] = useState(false); 

    if (loading) return <p>Cargando productos...</p>;
    if (error) return <p>Error al cargar productos: {error.message}</p>;

    const filteredProducts = data.getproductos.filter((producto) =>
        producto.nombreProductoDto.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container-fluid position-relative">
            <form
                className="d-flex"
                role="search"
                onSubmit={(e) => e.preventDefault()}
            >
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Buscar"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowResults(e.target.value.length > 0); 
                    }}
                    onBlur={() => setTimeout(() => setShowResults(false), 200)} 
                />
                <button className="btn btn-outline-success" type="submit">
                    <i className="bi bi-search"></i>
                </button>
            </form>

            {showResults && (
                <div className="search-results position-absolute bg-white border mt-1 w-100">
                    {filteredProducts.length > 0 ? (
                        <ul className="list-group">
                            {filteredProducts.map((producto) => (
                                <li key={producto.idDto} className="list-group-item">
                                    <Link to={`/producto/${producto.idDto}`} onClick={() => setShowResults(false)}>
                                        {producto.nombreProductoDto}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-muted p-2">No se encontraron productos</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Buscador;