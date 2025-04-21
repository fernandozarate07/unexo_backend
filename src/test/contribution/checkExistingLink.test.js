// Importa los módulos necesarios para la prueba
const request = require("supertest");
const express = require("express");
const checkExistingLink = require("../../middlewares/checkExistingLink");

// Mock de Prisma para simular las consultas a la base de datos
jest.mock("../../config/prisma", () => ({
  contribution: {
    findFirst: jest.fn(),
  },
}));

// Importa el objeto prisma
const prisma = require("../../config/prisma");

// Configura la aplicación Express para pruebas
const app = express();
app.use(express.json()); // Para poder parsear el cuerpo JSON de las solicitudes
app.post("/checkExistingLink", checkExistingLink, (req, res) => res.status(200).send("Link válido"));

// **Prueba 1: Falta el enlace en la solicitud**
/**
 * Caso de prueba para verificar que el middleware devuelva un error 400 si falta el enlace en la solicitud.
 */
test("debería devolver 400 si falta el enlace en la solicitud", async () => {
  const res = await request(app).post("/checkExistingLink").send({}); // Enviar una solicitud sin enlace

  expect(res.statusCode).toBe(400); // Debe devolver un código de estado 400
  expect(res.body.message).toBe("Falta el link en la solicitud."); // El mensaje debe ser "Falta el link en la solicitud."
});

// **Prueba 2: El enlace ya existe en la base de datos**
/**
 * Caso de prueba para verificar que el middleware devuelva un error 400 si el enlace ya existe en la base de datos.
 */
test("debería devolver 400 si el enlace ya existe en la base de datos", async () => {
  // Simula que el enlace ya existe en la base de datos
  prisma.contribution.findFirst.mockResolvedValueOnce({
    url: "https://drive.google.com/file/d/abc123/view?usp=sharing",
  });

  const res = await request(app).post("/checkExistingLink").send({
    linkDrive: "https://drive.google.com/file/d/abc123/view?usp=sharing", // Enviar un enlace que ya existe
  });

  expect(res.statusCode).toBe(400); // Debe devolver un código de estado 400
  expect(res.body.message).toBe("El enlace ya ha sido utilizado en otro aporte."); // El mensaje debe indicar que el enlace ya ha sido utilizado
});

// **Prueba 3: El enlace no existe en la base de datos**
/**
 * Caso de prueba para verificar que el middleware pase correctamente al siguiente middleware si el enlace no existe en la base de datos.
 */
test("debería continuar al siguiente middleware si el enlace no existe en la base de datos", async () => {
  // Simula que el enlace no existe en la base de datos
  prisma.contribution.findFirst.mockResolvedValueOnce(null);

  const res = await request(app).post("/checkExistingLink").send({
    linkDrive: "https://drive.google.com/file/d/xyz456/view?usp=sharing", // Enviar un enlace que no existe
  });

  expect(res.statusCode).toBe(200); // Debe devolver un código de estado 200
  expect(res.text).toBe("Link válido"); // El texto de la respuesta debe ser "Link válido"
});

// **Prueba 4: Error al verificar el enlace en la base de datos**
/**
 * Caso de prueba para verificar que el middleware devuelva un error 500 si ocurre un error al verificar el enlace en la base de datos.
 */
test("debería devolver 500 si ocurre un error al verificar el enlace en la base de datos", async () => {
  // Simula un error en la consulta a la base de datos
  prisma.contribution.findFirst.mockRejectedValueOnce(new Error("Database error"));

  const res = await request(app).post("/checkExistingLink").send({
    linkDrive: "https://drive.google.com/file/d/xyz456/view?usp=sharing", // Enviar un enlace para el cual se simula un error de base de datos
  });

  expect(res.statusCode).toBe(500); // Debe devolver un código de estado 500
  expect(res.body.message).toBe("Error al verificar el enlace en la base de datos."); // El mensaje debe ser el error de base de datos
});
