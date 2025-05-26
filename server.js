require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static('public'));

const pool = new Pool({
  connectionString: process.env.SUPABASE_DB_URL,
  ssl: { rejectUnauthorized: false }
});

app.get('/api/usuarios', async (req, res) => {
  const result = await pool.query('SELECT * FROM usuarios ORDER BY nombre');
  res.json(result.rows);
});

app.post('/api/usuarios', async (req, res) => {
  const { nombre, email } = req.body;
  await pool.query('INSERT INTO usuarios (id, nombre, email) VALUES (gen_random_uuid(), $1, $2)', [nombre, email]);
  res.json({ mensaje: 'Usuario agregado' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
