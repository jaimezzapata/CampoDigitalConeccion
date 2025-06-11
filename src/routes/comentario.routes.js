import express from 'express';
import {
    getComents,
    getComentsById,
    crearComentario,
} from '../controllers/comentario.controllers.js';

const router = express.Router();

//obtener comentarios de la pagina de solicitarnos
router.get('/coment', getComents);

//obtener solo un comentario 
router.get('/coment', getComentsById);
//insertar comentarios en la base de datos 
router.post('/coment', crearComentario);




export default router;