const express = require('express');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const findShortestRoute = require('./dijkstra');

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
      "SELECT * FROM clients WHERE name || ' ' || email || telephone || x || y  ILIKE $1 ORDER BY name;",
      [`%${search}%`]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao obter clientes:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

app.post('/clients',
  [
    body('name')
      .notEmpty().withMessage('O nome é obrigatório.')
      .isString().withMessage('O nome deve ser uma string.')
      .trim()
      .custom(value => {
        // Custom validation logic to check if the value contains only letters
        if (!/^[A-Za-z\s]+$/.test(value)) {
          throw new Error('O nome deve conter apenas letras.');
        }
        return true;
      }),
    body('email')
      .isEmail().withMessage('O e-mail inserido é inválido.')
      .normalizeEmail(),
    body('telephone')
      .optional({ nullable: true })
      .isString().withMessage('O telefone deve ser uma string.')
      .trim()
      .isLength({ min: 8 }).withMessage('O telefone deve ter no mínimo 8 dígitos.')
      .isLength({ max: 11 }).withMessage('O telefone deve ter no máximo 11 caracteres.'),
    body('x')
      .notEmpty().withMessage('O valor de x é obrigatório.')
      .isInt().withMessage('O valor de x deve ser um número inteiro.'),
    body('y')
      .notEmpty().withMessage('O valor de y é obrigatório.')
      .isInt().withMessage('O valor de y deve ser um número inteiro.'),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(error => error.msg);
      console.error('Erros de validação:', errorMessages);
      return res.status(400).json({ errors: errorMessages, message: 'Falha na validação.' });
    }

    const { name, email, telephone, x, y } = req.body;
    try {
      // Checa se um cliente com o mesmo email ja existe no banco de dados
      const existingClient = await pool.query('SELECT * FROM clients WHERE email = $1', [email]);
      if (existingClient.rows.length > 0) {
        return res.status(400).json({ message: 'Um cliente com o mesmo e-mail já existe.' });
      }

      const result = await pool.query(
        'INSERT INTO clients (name, email, telephone, x, y) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, email, telephone, x, y]
      );

      res.json(result.rows[0]);
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
      res.status(500).send('Erro interno do servidor');
    }
  }
);

app.get('/bestroute', async (req, res) => {
  try {

    const result = await pool.query(
      "SELECT * FROM clients;"
    );

    const clients = result.rows;

    // Encontra a rota mais curta.
    const shortestRoute = findShortestRoute(clients);
    res.json(shortestRoute);
  } catch (error) {
    console.error('Erro ao obter clientes:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

app.listen(port, () => {
  console.log(`Sever started on port ${port}`);
});
