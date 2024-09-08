package com.servipet.backend.Mascota.servicio;

import com.servipet.backend.Mascota.clase.Mascota;
import com.servipet.backend.Mascota.repositorio.RepositorioMascota;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ServicioMascota {
    @Autowired
    private RepositorioMascota repositorioMascota ;

    public Mascota guardarMascota(Mascota mascota){
        return repositorioMascota.save(mascota);
    }

    public List<Mascota> consultarMascota(){
        return repositorioMascota.findAll();
    }
    public Mascota actualizarMascota(Mascota mascota){
        return repositorioMascota.save(mascota);
    }
    public Mascota desactivarMascota(Mascota mascota){
        mascota.setEstado(2);
        return repositorioMascota.save(mascota);
    }
}
