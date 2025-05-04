const request = require("supertest");
const express = require("express");
const session = require("express-session");

jest.mock("../../config/prisma", () => ({
  savedContribution: {
    findMany: jest.fn(),
  },
}));

const prisma = require("../../config/prisma");
const recoverUserSavedContributions = require("../../controllers/savedContribution/recoverUserSavedContribution");

const app = express();

// Middleware para simular sesión
app.use(session({ secret: "test", resave: false, saveUninitialized: false }));
app.use((req, res, next) => {
  req.user = { id: 1 }; // Simula usuario autenticado
  next();
});

// Ruta para testear
app.get("/api/savedContributions", recoverUserSavedContributions);

describe("GET /api/savedContributions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("debería devolver 200 y las contribuciones guardadas del usuario", async () => {
    const fakeContributions = [
      {
        id: 1,
        userId: 1,
        contributionId: 10,
        contribution: {
          id: 10,
          title: "Resumen de física",
          description: "Resumen completo del primer parcial",
        },
      },
    ];

    prisma.savedContribution.findMany.mockResolvedValue(fakeContributions);

    const res = await request(app).get("/api/savedContributions");

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(fakeContributions);
    expect(prisma.savedContribution.findMany).toHaveBeenCalledWith({
      where: { userId: 1 },
      include: { contribution: true },
    });
  });

  it("debería devolver 404 si el usuario no tiene contribuciones guardadas", async () => {
    prisma.savedContribution.findMany.mockResolvedValue([]);

    const res = await request(app).get("/api/savedContributions");

    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ message: "!FOUND: No se encontro aportes guardados" });
  });

  it("debería devolver 500 si ocurre un error en el servidor", async () => {
    prisma.savedContribution.findMany.mockRejectedValue(new Error("DB error"));

    const res = await request(app).get("/api/savedContributions");

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ message: "ERROR: Se produjo un error interno del servidor" });
  });
});
