import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const CheckoutButton = () => {

    const location = useLocation();
    const pedido = location.state?.formData;
    const [preferenceId, setPreferenceId] = useState(null);
    const createPreference = async () => {
        try {
            initMercadoPago("APP_USR-57f8f4dd-98e1-42b5-b793-f23f4fd37333", { locale: "es-CO" });
            const r = await fetch("http://localhost:8080/api/payment/create_preference", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(pedido),
            })
            const data = await r.text(); // Aquí el backend devuelve el preferenceId como texto
            return data; // Devolver el ID de la preferencia
        } catch (e) {
            console.error(e);
        }
    }
    const handleBuy = async () => {
        const id = await createPreference();

        if (id) {
            console.log( id +"id")
            setPreferenceId(id);
        }
    }
    
    return (
        <div>
            <Button onClick={handleBuy}>
                Comprar
            </Button>
            <div>
                {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} />}
            </div>

        </div>

    );
};

export default CheckoutButton;
