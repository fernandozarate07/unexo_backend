// Importamos PrismaClient para interactuar con la base de datos
const { PrismaClient } = require("@prisma/client");

// Creamos una nueva instancia de PrismaClient para gestionar la conexión con la base de datos
const prisma = new PrismaClient();

// Exportamos la instancia para usarla en otras partes de la aplicación
module.exports = prisma;
