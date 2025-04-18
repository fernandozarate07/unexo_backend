const http = require("http");
const app = require("./app");

const PORT = process.env.PORT || 5001;

/**
 * Crear e iniciar un servidor HTTP utilizando el módulo `http` de Node.js y la aplicación Express.
 * El servidor escuchará en el puerto especificado por la variable de entorno `PORT` o, por defecto, en el puerto `5001`.
 *
 * @constant {number} PORT - El puerto en el que el servidor escucha. Se toma de la variable de entorno `PORT` o se utiliza `5001` por defecto.
 */

// Crear servidor HTTP
const server = http.createServer(app);

/**
 * Inicia el servidor HTTP para que empiece a escuchar las solicitudes entrantes.
 * El servidor escucha en el puerto especificado y, una vez iniciado, se muestra un mensaje en consola.
 */
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
