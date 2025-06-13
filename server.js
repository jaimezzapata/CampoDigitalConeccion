import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import contactoRoutes from './src/routes/contacto.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use((req, res, next) => {
  console.log('Petición recibida:', req.method, req.url);
  next();
});

app.use(express.static(path.join(__dirname, 'src', 'html')));
app.use('/css', express.static(path.join(__dirname, 'src', 'css')));
app.use('/js', express.static(path.join(__dirname, 'src', 'js')));
app.use('/imagen', express.static(path.join(__dirname, 'src', 'imagen')));

app.use('/api/contacto', contactoRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'html', 'contactanos.html'));
});

app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});