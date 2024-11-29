import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { useCarrito } from "../../../CarritoContext";
import PlantillaUno from "../../../componentes/PlantillaUno";
import { GET_PRODUCTOS_ESPECIFICO } from "../../../querys/productoEspecifcoQuery";
import { GET_PRODUCTOS } from "../../../querys/productosQuery";
import ProductoCard from "./ProductoCard";
const DetallesProducto = () =>{
    const {agregarAlcarrito} = useCarrito();
    const {id} = useParams();


    //Query de producto especifico//
    const {loading, error :errorEsp, data: dataEsp} = useQuery(GET_PRODUCTOS_ESPECIFICO, {
        variables: { id: id},
    });
     //Query todos los productos //


    const {loading : loadingAll, error : errorAll, data: dataAll} = useQuery(GET_PRODUCTOS);

    if (loading) return <p>Cargando...</p>
    if (errorEsp) return <p>Error producto especifico: {errorEsp}</p>
    const {getproductoById} = dataEsp;


    if (loadingAll) return <p>Cargando...</p>
    if (errorAll) return <p>Error todos los productos {errorAll}</p>
    const {getproductos} = dataAll;

    return (
        <PlantillaUno>


        <>

        <section className="bg-light py-5">
        <div className="container">
            <div className="product-container">
                <div className="product-image">
                    <img src={`data:image/jpeg;base64,${getproductoById.imagenProductoDto}`} alt="Producto"/>
                </div>
                <div className="product-info">
                    <h5>{getproductoById.nombreProductoDto}</h5>
                    <p>{getproductoById.descripcionProductoDto}</p>
                    <p className="product-price">${getproductoById.precioProductoDto}</p>
                    <p ></p>
                </div>
                <div className="product-actions">
                    {getproductoById.cantidadProductoDto === 1 ?(
                        <p>Ultima unidad!</p>
                    ):(
                        <p>Unidades disponibles : {getproductoById.cantidadProductoDto} </p>
                    )}

                    <button onClick={() =>agregarAlcarrito(getproductoById)} className="btn btn-cart">Agregar al carrito</button>
                    <Link className="btn btn-cart">Comprar ahora </Link>
                </div>
            </div>
        </div>
    </section>
    <ProductoCard productos={getproductos} ></ProductoCard>
    </>
    </PlantillaUno>
    )
}
export default DetallesProducto;

