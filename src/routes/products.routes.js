// src/routes/products.routes.js
import express from 'express';
import {
  getProductos ,
  createProducto
//   deleteProducto,
//   updateProducto,
//   getProductoById
} from '../controllers/products.controller.js';

const router = express.Router();

// Obtener todos los productos
router.get('/products', getProductos);

// Crear un nuevo producto
router.post('/products', createProducto);

// Obtener un solo producto por ID
// router.get('/products/:id', getProductoById);


// // Actualizar un producto por ID
// router.put('/products/:id', updateProducto);

// // Eliminar un producto por ID
// router.delete('/products/:id', deleteProducto);

export default router;

