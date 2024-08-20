package Usuario.Repositorio;

import Usuario.ClaseUsuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepositorioUsuario extends JpaRepository <ClaseUsuario, Long> {
}
