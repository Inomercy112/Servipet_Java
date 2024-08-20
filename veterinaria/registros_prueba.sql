use servipetjava;
insert into rol (nombre_rol) values("Administrador"),("Veterinaria"),("Cliente");
insert into estado (nombre_estado) values("Activo"),("Inactivo");

INSERT INTO usuario (documento, nombre_usuario, correo_usuario, contrasena_usuario, fecha_nacimiento, direccion, telefono, rol, estado)
VALUES (123456789, 'sistema', 'sistema@example.com', 'contraseña123', '1990-05-15', 'Calle Principal 123', 1234567890, 1, 1);



insert into tipo_de_mascota (nombre_tipo) values("Perro"),("Gato"),("Conejo"),("Roedor"),("Ave"),("Reptil"),("Otro");
insert into tamaño_mascota(nombre_tamaño)values("Grande"),("Mediano"),("Pequeño");

INSERT INTO mascota (nombre_mascota, fecha_nacimiento_mascota, peso_kg, antecedentes, dueno, tipo, tamaño, estado)
VALUES ('Presencial', '2019-07-10', 8, 'Sin antecedentes', 1, 1, 2, 1);

insert into estado_cita(nombre_estado_cita)values ("Aceptada"),("En espera"),("Cancelada");

insert into categoria(nombre_categoria) values("Secos"),("Humedos"),("Juguetes"),("Premios");





insert into metodo_entrega(nombre_metodo) values("Recoger en tienda"),("Domicilio");