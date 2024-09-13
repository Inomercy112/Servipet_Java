package com.servipet.backend.Mascota.repositorio;

import com.servipet.backend.Mascota.clase.Mascota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import  java.util.List;
@Repository
public interface RepositorioMascota extends JpaRepository<Mascota,Long> {
    @Query("SELECT v FROM vistaMascota v where v.dueno = :dueno")
    List<Object[]> findByDueno(@Param("dueno") short dueno);
}
