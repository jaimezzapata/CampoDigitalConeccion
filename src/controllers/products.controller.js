// src/controllers/products.controller.js
import { getConnection ,sql} from '../database/connection.js';

export const getProductos = async (req, res) => {
  try {
    const pool = await getConnection(); // llama la conexión la cual te retorna un pool, se hace la petición,
    const result = await pool.request().query('SELECT * FROM Productos'); //esta esla consulta, el await se utiliza para aguardar ha que termine la consulta y que se guarte en la variable result 
    console.log(result.recordset); // Muestra los productos en consola
    res.json(result.recordset);    // Envía los productos como respuesta JSON hacia el navegador
  } catch (error) {
    console.error("❌ Error al obtener productos:", error);
    res.status(500).json({ message: "Error al obtener productos" });
  }
};

export const createProducto = async (req, res) => {
  try {
    const { Producto, Descripcion, UnidadMedida, IdCategoria } = req.body;

    if (!Producto || !Descripcion || !UnidadMedida || !IdCategoria) {
      return res.status(400).json({ msg: 'Bad Request, por favor llena todos los campos' });
    }

    const pool = await getConnection();

    await pool.request()
      .input('Producto', sql.VarChar, Producto)
      .input('Descripcion', sql.VarChar, Descripcion)
      .input('UnidadMedida', sql.VarChar, UnidadMedida)
      .input('IdCategoria', sql.Int, IdCategoria)
      .query(`
        INSERT INTO Productos (Producto, Descripcion, UnidadMedida, IdCategoria)
        VALUES (@Producto, @Descripcion, @UnidadMedida, @IdCategoria)
      `);

    res.status(201).json({ message: 'Producto creado exitosamente' });
  } catch (error) {
    console.error('❌ Error al crear el producto:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

