# campo-digital

## Cambios realizados para almacenar datos del formulario de contacto en MySQL y SQL Server

### ¿Por qué no funcionaba antes?

- El formulario de contacto no enviaba los datos al backend, solo recargaba la página o no tenía acción definida.
- No existía una ruta ni lógica en el backend para recibir y almacenar los datos del formulario en la base de datos.
- No había funciones para insertar datos en MySQL ni en SQL Server desde Node.js.
- No se permitía elegir la base de datos destino para el registro.

### Código anterior (fragmentos relevantes)

**Formulario HTML:**
```html
<form action=""></form>
<label for="nombre">Nombre</label>
<input class="space" type="text" id="nombre" name="nombre"><br>
<button class="boton" type="submit">Enviar</button>
```

**Backend:**
- No existía ruta ni lógica para guardar el contacto.

---

### Código nuevo (fragmentos relevantes)

**Formulario HTML:**
```html
<form id="contactoForm">
  <label for="nombre">Nombre</label>
  <input class="space" type="text" id="nombre" name="nombre" required><br>
  <label for="db">Base de datos:</label>
  <select id="db" name="db">
    <option value="mysql">MySQL</option>
    <option value="mssql">SQL Server</option>
  </select>
  <button class="boton" type="submit">Enviar</button>
</form>
<script>
document.getElementById('contactoForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const data = {
    nombre: document.getElementById('nombre').value,
    correo: document.getElementById('correo').value,
    contrasena: document.getElementById('contraseña').value,
    mensaje: document.getElementById('mensaje').value,
    db: document.getElementById('db').value
  };
  const res = await fetch('/api/contacto', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const result = await res.json();
  alert(result.message);
});
</script>
```

**Backend:**
- Nueva ruta: `src/routes/contacto.routes.js`
- Nuevo controlador: `src/controllers/contacto.controller.js`
- Nuevas funciones en `src/database/query.js` para insertar en MySQL y SQL Server.
- Actualización en `server.js` para usar la nueva ruta.

---

### ¿Qué se hizo?

1. **Formulario de contacto (`src/html/contactanos.html`):**
   - Se mejoró el formulario para enviar los datos mediante AJAX (fetch) en vez de recargar la página.
   - Se agregó un selector para elegir la base de datos (MySQL o SQL Server).
   - Se añadió un script que envía los datos a una nueva ruta del backend (`/api/contacto`).

2. **Backend (Node.js):**
   - Se creó la ruta `src/routes/contacto.routes.js` para recibir los datos del formulario.
   - Se creó el controlador `src/controllers/contacto.controller.js` que recibe los datos y decide a qué base de datos guardar según la selección del usuario.
   - Se agregaron funciones en `src/database/query.js` para insertar los datos en MySQL y SQL Server usando los módulos nativos (`mysql2` y `mssql`), sin usar ORM.
   - Se actualizó `server.js` para incluir la nueva ruta `/api/contacto`.

### ¿Por qué se hicieron estos cambios?

- Para permitir que los usuarios del formulario de contacto puedan registrar su información y que esta se almacene en la base de datos elegida (MySQL o SQL Server), según la preferencia o necesidad.
- Para evitar el uso de ORM y tener control directo sobre las consultas SQL.
- Para mejorar la experiencia de usuario evitando recargas de página y mostrando mensajes de éxito o error inmediatos.

### Notas importantes
- Es necesario tener la tabla `Contacto` creada en ambas bases de datos con las columnas: `nombre`, `correo`, `contrasena`, `mensaje`.
- Se deben instalar los paquetes `mysql2` y `mssql` en el proyecto:
  ```
  npm install mysql2 mssql
  ```
- Configura los datos de conexión a las bases de datos en `src/database/connection.js` y `src/database/query.js` según tu entorno.

---

## Dependencias necesarias

Asegúrate de tener instaladas las siguientes dependencias en tu proyecto para que funcione el registro en ambas bases de datos:

### Producción
- **express**: Framework web para Node.js, permite crear el servidor y definir rutas HTTP.
- **cors**: Middleware para habilitar el intercambio de recursos entre distintos orígenes (CORS), necesario para peticiones desde el frontend.
- **mssql**: Cliente para conectarse y ejecutar consultas en bases de datos Microsoft SQL Server desde Node.js.
- **mysql2**: Cliente para conectarse y ejecutar consultas en bases de datos MySQL/MariaDB desde Node.js.

Puedes instalarlas con:
```bash
npm install express cors mssql mysql2
```

### Desarrollo (opcional)
- **nodemon**: Reinicia automáticamente el servidor al detectar cambios en los archivos fuente.
- **dotenv**: Permite cargar variables de entorno desde un archivo `.env` para gestionar configuraciones sensibles.
- **morgan**: Middleware para registrar solicitudes HTTP en la consola, útil para depuración.

Puedes instalarlas con:
```bash
npm install --save-dev nodemon dotenv morgan
```

Revisa también tu archivo `package.json` para verificar que estén incluidas.

## Ajustes recientes en la importación de módulos (junio 2025)

### Cambios realizados
- Se migró el archivo `src/database/query.js` de sintaxis CommonJS (`require`/`module.exports`) a sintaxis ESM (`import`/`export`) para ser compatible con el proyecto configurado como módulo (`"type": "module"` en `package.json`).
- Se cambió la importación en `src/controllers/products.controller.js` para usar la exportación nombrada `{ getAllProductos }` en vez de `import query from ...`, ya que no existe un export default.

### ¿Por qué se hicieron estos cambios?
- Node.js arroja un error cuando se intenta importar un export default desde un archivo que solo tiene exportaciones nombradas.
- Mantener la consistencia en el uso de módulos ESM en todo el proyecto evita errores de importación y facilita el mantenimiento del código.
- Permite aprovechar las ventajas de ESM, como la carga asíncrona y la interoperabilidad moderna en Node.js.

### Ejemplo de importación correcta:
```js
import { getAllProductos } from '../database/query.js';
```

Así se evita el error:
```
SyntaxError: The requested module '../database/query.js' does not provide an export named 'default'
```

---

## Servir frontend y backend juntos con Express

### Ajuste realizado
- Se configuró el archivo `server.js` para que Express sirva los archivos estáticos del frontend (HTML, CSS, JS, imágenes) desde las carpetas `/src/html`, `/src/css`, `/src/js`, `/src/imagen`, etc.
- Ahora puedes abrir directamente `http://localhost:3000/contactanos.html` y el formulario funcionará correctamente con la API `/api/contacto` en el mismo servidor.
- Se eliminó la necesidad de usar Live Server u otro servidor estático separado, evitando errores 405 (Method Not Allowed) por rutas inexistentes en el backend.

### ¿Por qué se hizo este cambio?
- Para que tanto el frontend como la API compartan el mismo origen y puerto, facilitando el desarrollo y evitando problemas de CORS o rutas no encontradas.
- Para asegurar que las peticiones AJAX del frontend lleguen correctamente al backend Express y reciban respuestas válidas.

### Ejemplo de acceso
Abre en tu navegador:
```
http://localhost:3000/contactanos.html
```

Así el formulario y la API funcionarán de manera integrada.

---

## Ajuste para servir archivos HTML correctamente

Para que las vistas HTML funcionen correctamente desde Express, se debe agregar la siguiente línea en `server.js`:

```js
app.use(express.static(path.join(__dirname, 'src', 'html')));
```

Esto permite acceder a cualquier archivo HTML directamente desde la raíz, por ejemplo:

- http://localhost:3000/contactanos.html
- http://localhost:3000/prueba.html

Si necesitas servir CSS, JS o imágenes, agrega también:

```js
app.use('/css', express.static(path.join(__dirname, 'src', 'css')));
app.use('/js', express.static(path.join(__dirname, 'src', 'js')));
app.use('/imagen', express.static(path.join(__dirname, 'src', 'imagen')));
```

**Importante:**
- Elimina o comenta cualquier otra línea que sirva archivos estáticos en rutas como `/html`, para evitar conflictos.
- Reinicia el servidor Express después de cualquier cambio en la configuración.

Con este ajuste, todas las vistas HTML estarán disponibles directamente y funcionarán correctamente con la API y los recursos estáticos.