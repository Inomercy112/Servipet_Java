package com.servipet.backend.Cita.Modelo;

import com.servipet.backend.Mascota.clase.Mascota;
import com.servipet.backend.Usuario.clase.Estado;
import com.servipet.backend.Usuario.clase.Usuario;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@Entity
@Table(name = "cita")
public class Cita {
    @Id
    @Column(name = "id_cita", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "razon", nullable = false)
    private String razon;

    @Column(name = "diagnostico")
    private String diagnostico;

    @Column(name = "fecha_cita", nullable = false)
    private LocalDate fechaCita;

    @Column(name = "hora_cita", nullable = false)
    private LocalTime horaCita;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "estado_cita", nullable = false)
    private EstadoCita estadoCita;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "quien_asiste", nullable = false)
    private Usuario quienAsiste;



    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "quien_atiende")
    private Usuario quienAtiende;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "mascota_asiste", nullable = false)
    private Mascota mascotaAsiste;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "estado", nullable = false)
    private Estado estado;

}