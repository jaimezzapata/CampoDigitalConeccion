import { getConnection, sql } from "../database/connection.js";

// Obtener todos los comentarios
export const getComents = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM ComentariosPeticiones");
    res.json(result.recordset);
  } catch (error) {
    console.error("❌ Error al obtener comentarios:", error);
    res.status(500).json({ message: "Error al obtener comentarios" });
  }
};

// Crear nuevo comentario
export const crearComentario = async (req, res) => {
  try {
    const {
      NombreCompleto,
      DescripcionSolicitud,
      Telefono,
      Correo
    } = req.body;

    if (!NombreCompleto || !DescripcionSolicitud || !Telefono || !Correo) {
      return res.status(400).json({ msg: "Por favor completa todos los campos requeridos" });
    }

    const pool = await getConnection();
    await pool.request()
      .input("NombreCompleto", sql.VarChar, NombreCompleto)
      .input("DescripcionSolicitud", sql.VarChar, DescripcionSolicitud)
      .input("Telefono", sql.VarChar, Telefono)
      .input("Correo", sql.VarChar, Correo)
      .query(`
        INSERT INTO ComentariosPeticiones (
          NombreCompleto, DescripcionSolicitud, Telefono, Correo
        ) VALUES (
          @NombreCompleto, @DescripcionSolicitud, @Telefono, @Correo
        )
      `);

    res.status(201).json({ message: "Comentario creado correctamente" });
  } catch (error) {
    console.error("❌ Error al crear comentario:", error);
    res.status(500).json({ message: "Error al crear comentario" });
  }
};


export const getComentsById = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('ComentarioId', sql.Int, id)
      .query('SELECT * FROM ComentariosPeticiones WHERE ComentarioId = @ComentarioId');

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Comentario no encontrado' }); // 🛠 mensaje corregido
    }

    res.json(result.recordset[0]); // 🛠 devolver solo un objeto, no array
  } catch (error) {
    console.error('❌ Error al obtener comentario por ID:', error);
    res.status(500).json({ message: 'Error al obtener el comentario' });
  }
};
