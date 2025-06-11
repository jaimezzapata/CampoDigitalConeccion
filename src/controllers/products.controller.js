// src/controllers/products.controller.js
import { getConnection ,sql} from '../database/connection.js';
import query from '../database/query.js' 

export const getProductos = async (req, res) => {
  try {
    const pool = await getConnection(); // llama la conexión la cual te retorna un pool, se hace la petición,
    const result = await pool.request().query(query.getAllProductos); //esta esla consulta, el await se utiliza para aguardar ha que termine la consulta y que se guarte en la variable result 
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

    res.status(201).json({
  message: 'Producto creado exitosamente',
  data: {
    Producto,
    Descripcion,
    UnidadMedida
  }
});

  } catch (error) {
    console.error('❌ Error al crear el producto:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};



export const getProductoById = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('IdProducto', id)
      .query('SELECT * FROM Productos WHERE IdProducto = @IdProducto');

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(result.recordset[0]);
  } catch (error) {
    console.error("❌ Error al obtener producto:", error);
    res.status(500).json({ message: "Error al obtener producto" });
  }
};



export const updateProducto = async (req, res) => {
  const { id } = req.params;
  const { Producto, Descripcion, UnidadMedida, IdCategoria } = req.body;

  try {
    const pool = await getConnection();
    await pool.request()
      .input('IdProducto', sql.Int, id)
      .input('Producto', sql.VarChar, Producto)
      .input('Descripcion', sql.VarChar, Descripcion)
      .input('UnidadMedida', sql.VarChar, UnidadMedida)
      .input('IdCategoria', sql.Int, IdCategoria)
      .query(`
        UPDATE Productos 
        SET Producto = @Producto, 
            Descripcion = @Descripcion, 
            UnidadMedida = @UnidadMedida, 
            IdCategoria = @IdCategoria 
        WHERE IdProducto = @IdProducto
      `);

    res.json({ message: "✅ Producto actualizado correctamente" });
  } catch (error) {
    console.error("❌ Error al actualizar producto:", error);
    res.status(500).json({ message: "Error al actualizar producto" });
  }
};

// Eliminar producto por ID
export const deleteProductoById = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input("IdProducto", id)
      .query('DELETE FROM Productos WHERE IdProducto = @IdProducto');

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar producto:", error);
    res.status(500).json({ message: "Error al eliminar producto" });
  }
};