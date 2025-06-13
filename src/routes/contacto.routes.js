import express from 'express';
import { registrarContacto } from '../controllers/contacto.controller.js';

const router = express.Router();

router.post('/', registrarContacto);

export default router;
