import express from 'express';
import {
    getComents,
    getComentsById,
    crearComentario,
} from '../controllers/comentario.controllers.js';

const router = express.Router();


router.get('/coment', getComents);


router.get('/coment', getComentsById);

router.post('/coment', crearComentario);




export default router;