import express from 'express';
import config from './config.js';
import productRoutes from './src/routes/products.routes.js';
import usuarioRoutes from './src/routes/usuarios.routes.js';

const app = express();

// Configuración del puerto
app.set('port', config.port);

// Middleware para permitir JSON en requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas con prefijo (buenas prácticas)
app.use(productRoutes);
app.use(usuarioRoutes);

// Exportar la app
export default app;
