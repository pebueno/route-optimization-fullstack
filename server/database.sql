CREATE DATABASE clients;

CREATE TABLE clients (
  clients_id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  telephone VARCHAR(20)
);