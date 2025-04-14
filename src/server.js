const http = require("http");
const app = require("./app");

const PORT = process.env.PORT || 5001;

// Crear servidor HTTP
const server = http.createServer(app);

// Iniciar servidor
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
