// database/connection.js
import sql from 'mssql';

const dbSettings = {
  user: "root",
  password: "root",
  server: "localhost",
  database: "testdb",
  options: {
    encrypt: true,
    trustServerCertificate: true,
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
