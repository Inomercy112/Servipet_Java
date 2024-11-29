drop database ServiPetMysql;
create database ServiPetMysql;
use ServiPetMysql;
alter user 'root'@'localhost' identified by '0315';

CREATE TABLE estado (
                        id_estado TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                        nombre_estado VARCHAR(20) NOT NULL
);

CREATE TABLE tipo_de_mascota (
                                 id_tipo TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                                 nombre_tipo VARCHAR(10) NOT NULL
);

CREATE TABLE tamaño_mascota (
                                id_tamaño TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                                nombre_tamaño VARCHAR(15) NOT NULL
);

CREATE TABLE mascota (
                         id_mascota TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                         nombre_mascota VARCHAR(20) NOT NULL,
                         fecha_nacimiento_mascota DATE NOT NULL,
                         peso_kg TINYINT UNSIGNED NOT NULL,
                         antecedentes VARCHAR(255) NOT NULL,
                         raza varchar(30) not null,
                         dueno varchar(255) NOT NULL,
                         tipo TINYINT UNSIGNED NOT NULL,
                         tamaño TINYINT UNSIGNED NOT NULL,
                         estado TINYINT UNSIGNED NOT NULL,
                         FOREIGN KEY (tipo) REFERENCES tipo_de_mascota(id_tipo),
                         FOREIGN KEY (tamaño) REFERENCES tamaño_mascota(id_tamaño),
                         FOREIGN KEY (estado) REFERENCES estado(id_estado)
);

CREATE TABLE estado_cita (
                             id_estado_cita TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                             nombre_estado_cita VARCHAR(30) NOT NULL
);

CREATE TABLE cita (
                      id_cita SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                      razon VARCHAR(255) NOT NULL,
                      diagnostico VARCHAR(255) NULL default "en espera",
                      fecha_cita DATE NOT NULL,
                      hora_cita TIME NOT NULL,
                      estado_cita TINYINT UNSIGNED NOT NULL default "2",
                      quien_asiste SMALLINT UNSIGNED NOT NULL,
                      quien_atiende SMALLINT UNSIGNED NULL,
                      mascota_asiste TINYINT UNSIGNED NOT NULL,
                      estado TINYINT UNSIGNED NOT NULL,
                      FOREIGN KEY (estado_cita) REFERENCES estado_cita(id_estado_cita),
                      FOREIGN KEY (mascota_asiste) REFERENCES mascota(id_mascota),
                      FOREIGN KEY (estado) REFERENCES estado(id_estado)
);

CREATE TABLE categoria (
                           id_categoria TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                           nombre_categoria VARCHAR(255) NOT NULL
);

CREATE TABLE metodo_entrega (
                                id_metodo TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                                nombre_metodo VARCHAR(20) NOT NULL
);

CREATE TABLE estado_entrega (
                                id_estado_entrega TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                                nombre_estado VARCHAR(20) NOT NULL
);

CREATE TABLE pedido (
                        id_pedido SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                        direccion VARCHAR(120) NOT NULL,
                        hora_compra TIME NOT NULL ,
                        dia_compra DATE NOT NULL ,
                        hora_entrega TIME  NULL ,
                        dia_entrega DATE NULL,
                        quien_compra VARCHAR(255) NOT NULL,
                        quien_vende VARCHAR(255) NOT NULL,
                        metodo_entrega TINYINT UNSIGNED NOT NULL,
                        estado_entrega TINYINT UNSIGNED NOT NULL,
                        FOREIGN KEY (metodo_entrega) REFERENCES metodo_entrega(id_metodo),
                        FOREIGN KEY (estado_entrega) REFERENCES estado_entrega(id_estado_entrega)
);

CREATE TABLE producto_pedido (
                                 id smallint unsigned primary key auto_increment,
                                 cantidad_producto TINYINT UNSIGNED NOT NULL,
                                 id_producto VARCHAR(255) NOT NULL,
                                 id_pedido SMALLINT UNSIGNED NOT NULL,
                                 precio_actual mediumint unsigned not null ,
                                 FOREIGN KEY (id_pedido) REFERENCES pedido(id_pedido)
);

