import React from "react";
import { Helmet } from "react-helmet";
import Footer from "./Footer";
import Header from "./Header";
import Sideb from "./Sideb";

const PlantillaCinco = ({ title, children }) => {
    return (
        <div id="root" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Header />
            <div style={{ display: 'flex', flex: 1 }}>
                <Sideb />
                <main style={{ flex: 1, marginLeft: '0px', padding: '20px' }}>
                    {children}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default PlantillaCinco;