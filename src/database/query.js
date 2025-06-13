import mysql from 'mysql2/promise';
import sql from 'mssql';
import { getConnection } from './connection.js';


const mysqlConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root', 
    database: 'testdb'
};

export const getAllProductos = 'SELECT * FROM Productos';

export async function insertarContactoMySQL(nombre, correo, contrasena, mensaje) {
    const conn = await mysql.createConnection(mysqlConfig);
    await conn.execute(
        'INSERT INTO Contacto (nombre, correo, contrasena, mensaje) VALUES (?, ?, ?, ?)',
        [nombre, correo, contrasena, mensaje]
    );
    await conn.end();
}

export async function insertarContactoMSSQL(nombre, correo, contrasena, mensaje) {
    const pool = await getConnection();
    await pool.request()
        .input('nombre', sql.VarChar, nombre)
        .input('correo', sql.VarChar, correo)
        .input('contrasena', sql.VarChar, contrasena)
        .input('mensaje', sql.VarChar, mensaje)
        .query('INSERT INTO Contacto (nombre, correo, contrasena, mensaje) VALUES (@nombre, @correo, @contrasena, @mensaje)');
}