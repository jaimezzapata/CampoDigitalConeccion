// database/connection.js
import sql from 'mssql';

const dbSettings = {
  user: "sa",
  password: "1020485975",
  server: "Santiago",
  database: "CampoDigitalBD",
  options: {
    encrypt: true,
    trustServerCertificate: true, // Permite aceptar certificados autofirmados
  }
};

export async function getConnection() {
  try {
    const pool = await sql.connect(dbSettings);
    return pool;
  } catch (error) {
    console.error("❌ Error al conectar con la base de datos:", error);
    throw error;
  }
}

export {sql};
