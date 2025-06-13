import { getConnection, sql } from '../database/connection.js';

export const getUsuarios = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Clientes');
    res.json(result.recordset);
  } catch (error) {
    console.error('❌ Error al obtener clientes:', error);
    res.status(500).json({ message: 'Error al obtener clientes' });
  }
};

export const createUsuario = async (req, res) => {
  try {
    const {
      IdTipoCliente,
      NombreCompleto,
      Telefono,
      IdTipoDocumento,
      NumeroDocumento,
      Email,
      FechaNacimiento,
      FechaRegistro,
      Contrasena,
    } = req.body;

    if (
      !IdTipoCliente ||
      !NombreCompleto ||
      !Telefono ||
      !IdTipoDocumento ||
      !NumeroDocumento ||
      !Email ||
      !Contrasena
    ) {
      return res.status(400).json({ msg: 'Por favor completa todos los campos requeridos' });
    }

    const pool = await getConnection();
    await pool.request()
      .input('IdTipoCliente', sql.Int, IdTipoCliente)
      .input('NombreCompleto', sql.NVarChar, NombreCompleto)
      .input('Telefono', sql.VarChar, Telefono)
      .input('IdTipoDocumento', sql.Int, IdTipoDocumento)
      .input('NumeroDocumento', sql.Int, NumeroDocumento)
      .input('Email', sql.NVarChar, Email)
      .input('FechaNacimiento', sql.DateTime, FechaNacimiento || null)
      .input('FechaRegistro', sql.DateTime, FechaRegistro || new Date())
      .input('Contrasena', sql.VarChar, Contrasena)
      .query(`
        INSERT INTO Clientes (
          IdTipoCliente, NombreCompleto, Telefono,
          IdTipoDocumento, NumeroDocumento, Email,
          FechaNacimiento, FechaRegistro, Contrasena
        ) VALUES (
          @IdTipoCliente, @NombreCompleto, @Telefono,
          @IdTipoDocumento, @NumeroDocumento, @Email,
          @FechaNacimiento, @FechaRegistro, @Contrasena
        )
      `);

    res.status(201).json({ message: 'Cliente creado correctamente' });
  } catch (error) {
    console.error('❌ Error al crear cliente:', error);
    res.status(500).json({ message: 'Error al crear cliente' });
  }
};

// Obtener cliente por ID
export const getUsuarioById = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('IdCliente', sql.Int, id)
      .query('SELECT * FROM Clientes WHERE IdCliente = @IdCliente');

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    res.json(result.recordset[0]);
  } catch (error) {
    console.error('❌ Error al obtener cliente:', error);
    res.status(500).json({ message: 'Error al obtener cliente' });
  }
};

export const updateUsuario = async (req, res) => {
  const { id } = req.params;
  const {
    IdTipoCliente,
    NombreCompleto,
    Telefono,
    IdTipoDocumento,
    NumeroDocumento,
    Email,
    FechaNacimiento,
    FechaRegistro,
    Contrasena,
  } = req.body;

  try {
    const pool = await getConnection();
    await pool.request()
      .input('IdCliente', sql.Int, id)
      .input('IdTipoCliente', sql.Int, IdTipoCliente)
      .input('NombreCompleto', sql.NVarChar, NombreCompleto)
      .input('Telefono', sql.VarChar, Telefono) // <- CAMBIO
      .input('IdTipoDocumento', sql.Int, IdTipoDocumento)
      .input('NumeroDocumento', sql.Int, NumeroDocumento)
      .input('Email', sql.NVarChar, Email)
      .input('FechaNacimiento', sql.DateTime, FechaNacimiento || null)
      .input('FechaRegistro', sql.DateTime, FechaRegistro || new Date())
      .input('Contrasena', sql.VarChar, Contrasena)
      .query(`
        UPDATE Clientes
        SET IdTipoCliente = @IdTipoCliente,
            NombreCompleto = @NombreCompleto,
            Telefono = @Telefono,
            IdTipoDocumento = @IdTipoDocumento,
            NumeroDocumento = @NumeroDocumento,
            Email = @Email,
            FechaNacimiento = @FechaNacimiento,
            FechaRegistro = @FechaRegistro,
            Contrasena = @Contrasena
        WHERE IdCliente = @IdCliente
      `);

    res.json({ message: 'Cliente actualizado correctamente' });
  } catch (error) {
    console.error('❌ Error al actualizar cliente:', error);
    res.status(500).json({ message: 'Error al actualizar cliente' });
  }
};

export const deleteUsuarioById = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('IdCliente', sql.Int, id)
      .query('DELETE FROM Clientes WHERE IdCliente = @IdCliente');

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    res.json({ message: 'Cliente eliminado correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar cliente:', error);
    res.status(500).json({ message: 'Error al eliminar cliente tiene clave foraneas' });
  }
};
