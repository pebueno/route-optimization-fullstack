const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
const pool = require("./db");

app.use(express.json());
// Servimos o CORS para todas as rotas, dessa forma o frontend consegue se comunicar com um servidor diferente do cliente
app.use(cors());

// ROUTES
app.get('/clients', async (req, res) => {
  try {

    let { search } = req.query;
    if (search === undefined) search = '';

    const result = await pool.query(
      "SELECT * FROM clients WHERE name || ' ' || email || telephone ILIKE $1",
      [`%${search}%`]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao obter clientes:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

app.post('/clients', async (req, res) => {
  const { name, email, telephone } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO clients (name, email, telephone) VALUES ($1, $2, $3) RETURNING *',
      [name, email, telephone]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao cadastrar cliente:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

app.listen(port, () => {
  console.log(`Sever started on port ${port}`);
});
