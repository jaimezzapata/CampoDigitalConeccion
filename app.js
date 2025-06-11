import express from 'express';
import config from './config.js';
import productRoutes from './src/routes/products.routes.js';

const app = express();



// Configuración del puerto
app.set('port', config.port);

// Middleware para permitir JSON en requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Usar rutas
app.use(productRoutes); // Ajusta la ruta base según lo necesites

// Exportar la app
export default app;


