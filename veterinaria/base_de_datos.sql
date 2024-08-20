drop database`servipetjava`;
create database servipetjava;
use servipetjava;
-- Tabla Rol
CREATE TABLE rol(
    id_rol TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nombre_rol VARCHAR(25) NOT NULL
);

-- Tabla Estado
CREATE TABLE estado(
    id_estado TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nombre_estado VARCHAR(10) NOT NULL
);

-- Tabla Usuario
CREATE TABLE usuario (
    id_usuario SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    documento BIGINT UNSIGNED UNIQUE,
    nombre_usuario VARCHAR(50) NOT NULL,
    correo_usuario VARCHAR(50) NOT NULL UNIQUE,
    contrasena_usuario VARCHAR(50) NOT NULL,
    fecha_nacimiento DATE  NULL,
    direccion VARCHAR(50)  NULL,
    telefono INT UNSIGNED  NULL,
    rol TINYINT UNSIGNED NOT NULL,
    estado TINYINT UNSIGNED NOT NULL DEFAULT 1,
    FOREIGN KEY (estado) REFERENCES estado(id_estado),
    FOREIGN KEY (rol) REFERENCES rol(id_rol)
);

-- Tabla Tipo de Mascota
CREATE TABLE tipo_de_mascota(
    id_tipo TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nombre_tipo VARCHAR(10)
);

-- Tabla Tamaño de Mascota
CREATE TABLE tamaño_mascota(
    id_tamaño TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nombre_tamaño VARCHAR(15)
);

-- Tabla Mascota
CREATE TABLE mascota(
    id_mascota SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nombre_mascota VARCHAR(20) NOT NULL,
    fecha_nacimiento_mascota DATE NOT NULL,
    peso_kg TINYINT UNSIGNED NOT NULL,
    antecedentes VARCHAR(255) NOT NULL,
    dueno SMALLINT UNSIGNED NOT NULL,
    tipo TINYINT UNSIGNED NOT NULL,
    tamaño TINYINT UNSIGNED NOT NULL,
    estado TINYINT UNSIGNED NOT NULL,
    FOREIGN KEY (dueno) REFERENCES usuario(id_usuario),
    FOREIGN KEY (tipo) REFERENCES tipo_de_mascota(id_tipo),
    FOREIGN KEY (tamaño) REFERENCES tamaño_mascota(id_tamaño),
    FOREIGN KEY (estado) REFERENCES estado(id_estado)
);

-- Tabla Cita
CREATE TABLE cita(
    id_cita SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    razon VARCHAR(255) NOT NULL,
    diagnostico VARCHAR(255) NULL,
    fecha_cita DATE NOT NULL,
    hora_cita TIME NOT NULL,
    quien_asiste SMALLINT UNSIGNED NOT NULL,
    quien_atiende SMALLINT UNSIGNED NULL,
    mascota_asiste SMALLINT UNSIGNED NOT NULL,
    estado TINYINT UNSIGNED NOT NULL,
    FOREIGN KEY (quien_asiste) REFERENCES usuario(id_usuario),
    FOREIGN KEY (quien_atiende) REFERENCES usuario(id_usuario),
    FOREIGN KEY (mascota_asiste) REFERENCES mascota(id_mascota),
    FOREIGN KEY (estado) REFERENCES estado(id_estado)
);

-- Tabla Categoría
CREATE TABLE categoria(
    id_categoria TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nombre_categoria VARCHAR(255) NOT NULL
);

-- Tabla Producto
CREATE TABLE producto(
    id_producto SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nombre_producto VARCHAR(60) NOT NULL,
    descripcion_producto VARCHAR(255) NOT NULL,
    precio_producto MEDIUMINT UNSIGNED NOT NULL,
    cantidad_producto TINYINT UNSIGNED NOT NULL,
    quien_registra SMALLINT UNSIGNED NOT NULL,
    estado TINYINT UNSIGNED NOT NULL,
    FOREIGN KEY (quien_registra) REFERENCES usuario(id_usuario),
    FOREIGN KEY (estado) REFERENCES estado(id_estado)
);

-- Tabla Método de Entrega
CREATE TABLE metodo_entrega(
    id_metodo TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nombre_metodo VARCHAR(20) NOT NULL
);

-- Tabla Estado de Entrega
CREATE TABLE estado_entrega(
    id_estado TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nombre_estado VARCHAR(20) NOT NULL
);

-- Tabla Pedido
CREATE TABLE pedido(
    id_compra SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    cantidad_producto TINYINT UNSIGNED NOT NULL,
    valor_compra MEDIUMINT UNSIGNED NOT NULL,
    quien_compra SMALLINT UNSIGNED NOT NULL,
    metodo_entrega TINYINT UNSIGNED NOT NULL,
    estado_entrega TINYINT UNSIGNED NOT NULL,
    FOREIGN KEY (quien_compra) REFERENCES usuario(id_usuario),
    FOREIGN KEY (metodo_entrega) REFERENCES metodo_entrega(id_metodo),
    FOREIGN KEY (estado_entrega) REFERENCES estado_entrega(id_estado)
);

