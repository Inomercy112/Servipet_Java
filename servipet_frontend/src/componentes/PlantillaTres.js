import React from "react";
import { Helmet } from "react-helmet";

import Header from "./Header";
const PlantillaTres =({title, children})=>{
    return (
        <div>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Header/>
            <main>
                {children}
            </main>
        </div>

    );
}
export default PlantillaTres;