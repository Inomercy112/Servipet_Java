import React from "react";
import { Helmet } from "react-helmet";
import Footer from "./Footer";
import HeaderSolo from "./HeaderSolo";

const PlantillaCuatro = ({ title, children }) => {
    return (
        <div id="root" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <HeaderSolo />
            <main style={{ flex: 1 }}>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default PlantillaCuatro;
