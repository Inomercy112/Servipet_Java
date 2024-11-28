
use ServiPetMysql;
insert into estado (nombre_estado) values("Activo"),("Inactivo");

insert into tipo_de_mascota (nombre_tipo) values("Perro"),("Gato"),("Conejo"),("Roedor"),("Ave"),("Reptil"),("Otro");
insert into tamaño_mascota(nombre_tamaño)values("pequeño"),("Mediano"),("grande");

insert into estado_cita(nombre_estado_cita)values ("Aceptada"),("En espera"),("Cancelada");

insert into categoria(nombre_categoria) values("Secos"),("Humedos"),("Juguetes"),("Premios");

insert into metodo_entrega(nombre_metodo) values("Recoger en tienda"),("Domicilio");
insert into estado_entrega(nombre_estado) values("En espera"),("En camino"),("Entregado");