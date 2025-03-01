import React from "react";
import { Helmet } from "react-helmet";
import Footer from "./Footer";
import Header from "./Header";

const PlantillaUno = ({ title, children }) => {
    return (
        <div id="root" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Header />
            <main style={{ flex: 1 }}>
                {children}
            </main>
            <div style={{ marginTop: '17%', backgroundColor: '#f8f9fa', padding: '1rem', textAlign: 'center' }}>
                <Footer />
            </div>

        </div>
    );
};

export default PlantillaUno;
