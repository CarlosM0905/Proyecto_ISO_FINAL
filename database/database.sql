CREATE DATABASE project_iso;

USE project_iso;

CREATE TABLE company(
    com_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    com_name VARCHAR(1000) NOT NULL,
    com_address VARCHAR(1000),
    com_province VARCHAR(1000),
    com_phone VARCHAR(50),
    com_category VARCHAR (500)
);

CREATE TABLE certifier(
    cer_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cer_name VARCHAR(1000) NOT NULL,
    cer_description VARCHAR(1000) NOT NULL
);

CREATE TABLE certification(
    certif_cer_id INT(11) NOT NULL,
    certif_com_id INT(11) NOT NULL,
    certif_name VARCHAR(500),
    certif_year INT(4),
    FOREIGN KEY (certif_cer_id) REFERENCES certifier(cer_id),
    FOREIGN KEY (certif_com_id) REFERENCES company(com_id)
);
