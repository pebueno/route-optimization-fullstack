CREATE DATABASE clients;

CREATE TABLE clients (
  client_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  telephone VARCHAR(20),
  x INTEGER NOT NULL,
  y INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create a trigger to update updated_at on every UPDATE operation
CREATE OR REPLACE FUNCTION update_clients_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_clients_trigger
BEFORE UPDATE ON clients
FOR EACH ROW
EXECUTE FUNCTION update_clients_updated_at();

-- Replace 'clients' with your table name
SELECT * FROM information_schema.triggers WHERE event_object_table = 'clients';

-- Create an index on the 'name' column
CREATE INDEX idx_clients_name ON clients(name);