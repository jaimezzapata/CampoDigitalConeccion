const express = require('express');
const cors = require('cors');
const db = require('./db');  // Importa la conexión a MySQL

const app = express();

app.use(cors());
app.use(express.json());     // Permite recibir JSON
app.use(express.static('public'));  // Sirve archivos HTML/JS/CSS de la carpeta public

// Ruta POST para guardar datos
app.post('/guardar', (req, res) => {
  const { nombre, email } = req.body;

  // Consulta SQL con valores dinámicos
  const sql = 'INSERT INTO usuarios (nombre, email) VALUES (?, ?)';
  db.query(sql, [nombre, email], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al guardar');
    }
    res.send('Datos guardados correctamente');
  });
});

app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});