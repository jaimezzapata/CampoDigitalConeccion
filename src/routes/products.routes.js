import express from 'express';
import {
  getProductos,
  createProducto,
  getProductoById,  
  deleteProductoById,
  updateProducto,
} from '../controllers/products.controller.js';

const router = express.Router();

// Obtener todos los productos
router.get('/products', getProductos);

// Crear un nuevo producto
router.post('/products', createProducto);

// Obtener un solo producto por ID
router.get('/products/:id', getProductoById);

// Actualizar un producto por ID
router.put('/products/:id', updateProducto);

// Eliminar un producto por ID
router.delete('/products/:id', deleteProductoById);

export default router;
