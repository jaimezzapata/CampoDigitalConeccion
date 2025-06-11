const mysql = require('mysql2');

const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'sa',
  password: 'Santiago27*', 
  database: 'XXX' 
});

conexion.connect((err) => {
  if (err) throw err;
  console.log('Conectado a MySQL');
});

module.exports = conexion;
