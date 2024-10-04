import React from 'react';
import veter from '../../../img/veter.jpg';

import PlantillaUno from '../../../componentes/PlantillaUno';

const Veterinario = () => {
  return (
    < PlantillaUno  title="ServiPet - Veterinario">
      <section>
        <div className="container">
          <div id="carouselExampleCaptions" className="carousel slide">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={veter} className="d-block w-100" alt="Veterinario" />
                <div className="carousel-caption d-none d-md-block"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </ PlantillaUno >
  );
}

export default Veterinario;
