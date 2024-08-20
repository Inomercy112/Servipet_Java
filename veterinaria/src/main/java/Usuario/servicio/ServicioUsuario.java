package Usuario.servicio;

import Usuario.ClaseUsuario;
import Usuario.Repositorio.RepositorioUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServicioUsuario {
    @Autowired
    private RepositorioUsuario usuarioRepositorio;

    public ClaseUsuario guardarUsuario(ClaseUsuario claseUsuario){
        return  usuarioRepositorio.save(claseUsuario);
    }
    public List<ClaseUsuario> consultarUsuario(){
        return usuarioRepositorio.findAll();
    }
}
