import express from 'express';
import {
  getUsuarios,
  createUsuario,
  getUsuarioById,  
  deleteUsuarioById,
  updateUsuario,
} from '../controllers/usuarios.controllers.js';

const router = express.Router();

router.get('/usuarios', getUsuarios);


router.post('/usuarios', createUsuario);


router.get('/usuarios/:id', getUsuarioById);


router.put('/usuarios/:id', updateUsuario);

router.delete('/usuarios/:id', deleteUsuarioById);

export default router;
