package com.servipet.backend.Mascota.servicio;

import com.servipet.backend.Mascota.clase.Mascota;
import com.servipet.backend.Mascota.clase.TipoDeMascota;

import com.servipet.backend.Mascota.repositorio.RepositorioMascota;
import com.servipet.backend.Mascota.repositorio.RepositorioTipo;
import com.servipet.backend.Usuario.clase.Estado;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServicioMascota {
    private final RepositorioMascota repositorioMascota;
    private final RepositorioTipo repositorioTipo;
    @Autowired
    public ServicioMascota(RepositorioMascota repositorioMascota, RepositorioTipo repositorioTipo) {
        this.repositorioMascota = repositorioMascota;
        this.repositorioTipo = repositorioTipo;

    }





    public Optional<Mascota> consultaEsp(String id){
        return repositorioMascota.findById(id);

    }

    public List<TipoDeMascota> consultarTipo(){
        return repositorioTipo.findAll();
    }

    public void guardarMascota(Mascota mascota){
        repositorioMascota.save(mascota);
    }

    public List<Mascota> consultarMascota(Integer id ){
        return  repositorioMascota.findByDuenoId(id);

    }
    public void actualizarMascota(Mascota mascota){
        repositorioMascota.save(mascota);
    }

    public void desactivarMascota(Mascota mascota){
        Estado estado = mascota.getEstado();
        mascota.setEstado(estado);
        repositorioMascota.save(mascota);
    }
}
