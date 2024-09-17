drop database servipetjava;
create database servipetjava;
use servipetjava;
alter user 'root'@'localhost' identified by '0315';
CREATE TABLE rol (
    id_rol TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre_rol VARCHAR(25) NOT NULL
);

CREATE TABLE estado (
    id_estado TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre_estado VARCHAR(20) NOT NULL
);

CREATE TABLE usuario (
    id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    documento BIGINT UNSIGNED UNIQUE NULL,
    nombre_usuario VARCHAR(50) NOT NULL DEFAULT 'usuario',
    correo_usuario VARCHAR(255) NOT NULL UNIQUE,
    contrasena_usuario VARCHAR(255) NOT NULL,
    fecha_nacimiento DATE NULL,
    direccion VARCHAR(50) NULL,
    telefono INT UNSIGNED NULL,
    rol TINYINT UNSIGNED NOT NULL,
    estado TINYINT UNSIGNED NOT NULL,
    FOREIGN KEY (rol) REFERENCES rol(id_rol),
    FOREIGN KEY (estado) REFERENCES estado(id_estado)
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
    dueno SMALLINT UNSIGNED NOT NULL,
    tipo TINYINT UNSIGNED NOT NULL,
    tamaño TINYINT UNSIGNED NOT NULL,
    estado TINYINT UNSIGNED NOT NULL,
    FOREIGN KEY (dueno) REFERENCES usuario(id),
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
    diagnostico VARCHAR(255) NULL,
    fecha_cita DATE NOT NULL,
    hora_cita TIME NOT NULL,
    estado_cita TINYINT UNSIGNED NOT NULL,
    quien_asiste SMALLINT UNSIGNED NOT NULL,
    documento_quien_asiste BIGINT UNSIGNED NOT NULL,
    quien_atiende SMALLINT UNSIGNED NULL,
    mascota_asiste TINYINT UNSIGNED NOT NULL,
    estado TINYINT UNSIGNED NOT NULL,
    FOREIGN KEY (estado_cita) REFERENCES estado_cita(id_estado_cita),
    FOREIGN KEY (quien_asiste) REFERENCES usuario(id),
    FOREIGN KEY (documento_quien_asiste) REFERENCES usuario(documento),
    FOREIGN KEY (quien_atiende) REFERENCES usuario(id),
    FOREIGN KEY (mascota_asiste) REFERENCES mascota(id_mascota),
    FOREIGN KEY (estado) REFERENCES estado(id_estado)
);

CREATE TABLE categoria (
    id_categoria TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre_categoria VARCHAR(255) NOT NULL
);

CREATE TABLE producto (
    id_producto SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    imagen_producto BLOB NOT NULL,
    nombre_producto VARCHAR(60) NOT NULL,
    descripcion_producto VARCHAR(255) NOT NULL,
    precio_producto MEDIUMINT UNSIGNED NOT NULL,
    cantidad_producto TINYINT UNSIGNED NOT NULL,
    estado TINYINT UNSIGNED NOT NULL,
    FOREIGN KEY (estado) REFERENCES estado(id_estado)
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
    id_compra SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    cantidad_producto TINYINT UNSIGNED NOT NULL,
    valor_compra MEDIUMINT UNSIGNED NOT NULL,
    quien_compra SMALLINT UNSIGNED NOT NULL,
    metodo_entrega TINYINT UNSIGNED NOT NULL,
    estado_entrega TINYINT UNSIGNED NOT NULL,
    FOREIGN KEY (quien_compra) REFERENCES usuario(id),
    FOREIGN KEY (metodo_entrega) REFERENCES metodo_entrega(id_metodo),
    FOREIGN KEY (estado_entrega) REFERENCES estado_entrega(id_estado_entrega)
);

CREATE TABLE venta (
    id_venta SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    valor_venta MEDIUMINT UNSIGNED NOT NULL,
    vendedor SMALLINT UNSIGNED NOT NULL,
    FOREIGN KEY (vendedor) REFERENCES usuario(id)
);

CREATE TABLE producto_venta (
    cantidad_producto TINYINT UNSIGNED NOT NULL,
    id_producto SMALLINT UNSIGNED NOT NULL,
    id_venta SMALLINT UNSIGNED NOT NULL,
    FOREIGN KEY (id_producto) REFERENCES producto(id_producto),
    FOREIGN KEY (id_venta) REFERENCES venta(id_venta)
);

CREATE TABLE producto_compra (
    cantidad_producto TINYINT UNSIGNED NOT NULL,
    id_producto SMALLINT UNSIGNED NOT NULL,
    id_compra SMALLINT UNSIGNED NOT NULL,
    FOREIGN KEY (id_producto) REFERENCES producto(id_producto),
    FOREIGN KEY (id_compra) REFERENCES pedido(id_compra)
);

CREATE TABLE producto_categoria (
    id_producto SMALLINT UNSIGNED NOT NULL,
    id_categoria TINYINT UNSIGNED NOT NULL,
    FOREIGN KEY (id_producto) REFERENCES producto(id_producto),
    FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
);
