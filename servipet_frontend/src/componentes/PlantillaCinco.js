
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Footer from "./Footer";
import Header from "./Header";
import SidebarFilter from "./Sideb";

const PlantillaCinco = ({ title, children, productos, priceRange, maxPrice, onPriceChange }) => {
    return (
        <div id="root" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Header />
            <div style={{ display: 'flex', flex: 1 }}>
                <SidebarFilter
                    productos={productos}
                    priceRange={priceRange}
                    maxPrice={maxPrice}
                    onPriceChange={onPriceChange}
                />
                <main style={{ flex: 1, marginLeft: '0px', padding: '20px' }}>
                    {children}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default PlantillaCinco;
