import express from 'express';
import {
  getProductos,
  createProducto,
  getProductoById,  
  deleteProductoById,
  updateProducto,
} from '../controllers/products.controller.js';

const router = express.Router();


router.get('/products', getProductos);

router.post('/products', createProducto);


router.get('/products/:id', getProductoById);

router.put('/products/:id', updateProducto);

router.delete('/products/:id', deleteProductoById);

export default router;
