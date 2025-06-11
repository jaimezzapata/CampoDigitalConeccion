import express from 'express';
import {
  getUsuarios,
  createUsuario,
  getUsuarioById,  
  deleteUsuarioById,
  updateUsuario,
} from '../controllers/usuarios.controllers.js';

const router = express.Router();

// Obtener todos los usuarios
router.get('/usuarios', getUsuarios);

// Crear un nuevo usuario
router.post('/usuarios', createUsuario);

// Obtener un solo usuario por ID
router.get('/usuarios/:id', getUsuarioById);

// Actualizar un usuario por ID
router.put('/usuarios/:id', updateUsuario);

// Eliminar un usuario por ID
router.delete('/usuarios/:id', deleteUsuarioById);

export default router;
