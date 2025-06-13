import express from 'express';
import config from './config.js';
import productRoutes from './src/routes/products.routes.js';
import usuarioRoutes from './src/routes/usuarios.routes.js';
import comentarioRoutes from './src/routes/comentario.routes.js'

const app = express();


app.set('port', config.port);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(productRoutes);
app.use(usuarioRoutes);
app.use(comentarioRoutes);

// Exportar la app
export default app;
