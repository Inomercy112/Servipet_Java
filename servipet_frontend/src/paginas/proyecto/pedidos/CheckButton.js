import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const CheckoutButton = () => {

    const location = useLocation();
    const pedido = location.state?.formData;
    const [preferenceId, setPreferenceId] = useState(null);
    const createPreference = async () => {
        try {
            initMercadoPago("APP_USR-57f8f4dd-98e1-42b5-b793-f23f4fd37333", { locale: "es-CO" });
            const r = await fetch(`${backendUrl}/api/payment/create_preference`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    'ngrok-skip-browser-warning': 'true'
                },
                body: JSON.stringify(pedido),
            })
            const data = await r.text(); 
            return data; 
        } catch (e) {
            console.error(e);
        }
    }
    const handleBuy = async () => {
        const id = await createPreference();

        if (id) {
            console.log( id +"id")
            setPreferenceId(id);
            localStorage.removeItem("carrito");
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
