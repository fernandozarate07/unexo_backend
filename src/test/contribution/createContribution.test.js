// Importa los módulos necesarios para la prueba
const request = require("supertest");
const express = require("express");
const createContribution = require("../../controllers/contribution/createContribution");

// Mock de Prisma
// Simula la función `prisma.contribution.create` para evitar la interacción con la base de datos real durante las pruebas.
jest.mock("../../config/prisma", () => ({
  contribution: {
    create: jest.fn(),
  },
}));

const prisma = require("../../config/prisma");

// Configura la aplicación Express para pruebas
const app = express();
app.use(express.json()); // Para poder parsear el cuerpo JSON de las solicitudes

// Middleware mock para simular un usuario autenticado (reemplaza la autenticación real en las pruebas)
app.use((req, res, next) => {
  req.user = { id: 1 }; // Usuario simulado con un ID de usuario 1
  next();
});

app.post("/contribution", createContribution); // Ruta que usa el controlador createContribution

// Descripción del conjunto de pruebas para la ruta POST /contribution
describe("POST /contribution", () => {
  // Cuerpo de ejemplo para las pruebas
  const sampleBody = {
    title: "Apunte de Álgebra",
    description: "Apunte completo de la materia.",
    typeId: 1,
    facultyId: 1,
    degreeId: 2,
    yearId: 1,
    subjectId: 3,
    linkDrive: "https://drive.google.com/file/d/abc123/view",
  };

  // **Caso de prueba 1: Crear un aporte exitoso**
  /**
   * Este caso verifica que la creación de un aporte se realice correctamente.
   * Se simula que la creación del aporte en la base de datos fue exitosa.
   */
  test("debería crear un aporte y devolver 201", async () => {
    // Simula una respuesta de éxito al crear el aporte (con un ID asignado)
    const mockContribution = { id: 100, ...sampleBody, userId: 1, url: sampleBody.linkDrive };
    prisma.contribution.create.mockResolvedValue(mockContribution);

    const res = await request(app).post("/contribution").send(sampleBody);

    expect(res.statusCode).toBe(201); // El código de estado debe ser 201 (Creado)
    expect(res.body.message).toBe("Aporte creado con éxito"); // El mensaje debe ser de éxito
    expect(res.body.aporte).toEqual(mockContribution); // El cuerpo de la respuesta debe contener el aporte creado
  });

  // **Caso de prueba 2: Manejo de errores al crear un aporte**
  /**
   * Este caso verifica que, si ocurre un error al crear el aporte (como un error en la base de datos),
   * se devuelva el código de estado 500 con un mensaje de error.
   */
  test("debería manejar errores y devolver 500", async () => {
    // Simula un error en la creación del aporte (por ejemplo, un fallo en la base de datos)
    prisma.contribution.create.mockRejectedValue(new Error("DB fail"));

    const res = await request(app).post("/contribution").send(sampleBody);

    expect(res.statusCode).toBe(500); // El código de estado debe ser 500 (Error interno del servidor)
    expect(res.body.message).toBe("ERROR: Error al crear el aporte"); // El mensaje debe indicar el error en la creación
  });
});
