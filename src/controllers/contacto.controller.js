import { insertarContactoMySQL, insertarContactoMSSQL } from '../database/query.js';

export const registrarContacto = async (req, res) => {
    const { nombre, correo, contrasena, mensaje, db } = req.body;
    try {
        if (db === 'mysql') {
            await insertarContactoMySQL(nombre, correo, contrasena, mensaje);
            res.json({ message: 'Contacto guardado en MySQL correctamente.' });
        } else if (db === 'mssql') {
            await insertarContactoMSSQL(nombre, correo, contrasena, mensaje);
            res.json({ message: 'Contacto guardado en SQL Server correctamente.' });
        } else {
            res.status(400).json({ message: 'Base de datos no soportada.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al guardar el contacto', error: error.message });
    }
};
