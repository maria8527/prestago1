CREATE USER prestago_silva; 
ALTER USER prestago_silva WITH PASSWORD '1234';

CREATE TABLESPACE table_prestago LOCATION 'C:\data';

CREATE DATABASE prestago WITH  
OWNER = 'prestago_silva' 
ENCODING = 'UTF8' 
TABLESPACE = table_prestago;

CREATE SCHEMA main; 
CREATE SCHEMA adm;

CREATE SEQUENCE registro_seq;


CREATE TABLE registro  (
  id INT4 NOT NULL DEFAULT NEXTVAL('registro_seq'), 
  N_documento INTEGER NOT DEFAULT NULL ,
  tipo_documento VARCHAR(4) NOT NULL,
  nombre_completo VARCHAR(200) NOT NULL,
  fecha_nacimiento date NOT NULL,
  numero_celular INTEGER NOT NULL,
  email VARCHAR(50) NOT NULL,
  Profesión_u_oficio VARCHAR(100) NOT NULL,
  direccion VARCHAR(100) NOT NULL,
  rol VARCHAR(50) NOT NULL,
  contraseña VARCHAR(12) NOT NULL,
  PRIMARY KEY (id)
)



CREATE SEQUENCE prestamo_seq;

CREATE TABLE prestamo  (
  id INT4 NOT NULL DEFAULT NEXTVAL('prestamo_seq'), 
  monto_prestar INTEGER NOT NULL,
  plazo_en_meses INTEGER NOT NULL,
  nombre_completo VARCHAR(200) NOT NULL,
  fecha_creacion timestamp NOT NULL DEFAULT current_timestamp,
  tasa_interes INTEGER NOT NULL,
  estado VARCHAR(20) NOT NULL,
  PRIMARY KEY (id),
    CONSTRAINT FK_registro FOREIGN KEY (regitro_id)
     REFERENCES registro (id) ON DELETE RESTRICT ON UPDATE CASCADE
)

INSERT INTO prestamo VALUES (NEXTVAL('prestamo_seq') '5000000', '12', 'sindy silva ','2022-01-15', '0,18', 'aprobado',);
INSERT INTO prestamo VALUES (NEXTVAL('prestamo_seq') '6000000', '24', 'maria alejandra trujillo','2022-01-20', '0,15', 'aprobado',);
INSERT INTO prestamo VALUES (NEXTVAL('prestamo_seq') '5000000', '36', 'juliana sanchez','2021-09-15', '0,20', 'aprobado',);



CREATE SEQUENCE pago_seq;

CREATE TABLE pago  (
  id INT4 NOT NULL DEFAULT NEXTVAL('pago_seq'), 
  fecha_pago_cuotas date NOT NULL,
  tiempo_pagar INTEGER NOT NULL,
  cuota_pagar INTEGER NOT NULL,

  PRIMARY KEY (id),
   CONSTRAINT fk_prestamo 
     FOREIGN KEY (prestamo_id) REFERENCES prestamo (id) 
     ON DELETE RESTRICT ON UPDATE CASCADE,
     CONSTRAINT fk_registro FOREIGN KEY (registro_id) 
     REFERENCES registro (id) ON DELETE RESTRICT ON UPDATE CASCADE
)
INSERT INTO pago VALUES (NEXTVAL('pago_seq') '2022-02-15', '12', '1',);
INSERT INTO pago VALUES (NEXTVAL('pago_seq') '2022-02-20', '24',  '1',);
INSERT INTO pago VALUES (NEXTVAL('paho_seq') '2022-05-15', '36', '8',);


CREATE SEQUENCE historial_seq;
CREATE TABLE historial  (
  id INT4 NOT NULL DEFAULT NEXTVAL('historial_seq'), 
  
  PRIMARY KEY (id),
  CONSTRAINT fk_prestamo 
  FOREIGN KEY (prestamo_id) REFERENCES prestamo (id) 
  ON DELETE RESTRICT ON UPDATE CASCADE,
 CONSTRAINT fk_registro FOREIGN KEY (id) 
 REFERENCES registro (id) ON DELETE RESTRICT ON UPDATE CASCADE
)


