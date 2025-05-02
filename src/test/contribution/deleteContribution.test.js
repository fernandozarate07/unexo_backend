const request = require("supertest");
const express = require("express");
const deleteContribution = require("../../../src/controllers/contribution/deleteContribution");

// 🧪 Mock Prisma directamente
jest.mock("../../../src/config/prisma", () => ({
  contribution: {
    findUnique: jest.fn(),
    delete: jest.fn(),
  },
}));

const prisma = require("../../../src/config/prisma");

const app = express();
app.delete("/api/contribution/:id", deleteContribution);

describe("DELETE /api/contribution/:id", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debe eliminar exitosamente un aporte existente", async () => {
    prisma.contribution.findUnique.mockResolvedValue({ id: 1 });
    prisma.contribution.delete.mockResolvedValue({ id: 1 });

    const res = await request(app).delete("/api/contribution/1");

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("SUCCESS: Publicación eliminada exitosamente");
    expect(prisma.contribution.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(prisma.contribution.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it("debe devolver 404 si el aporte no existe", async () => {
    prisma.contribution.findUnique.mockResolvedValue(null);

    const res = await request(app).delete("/api/contribution/999");

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("ERROR: Publicación no encontrada");
  });

  it("debe devolver 400 si el ID no es válido", async () => {
    const res = await request(app).delete("/api/contribution/abc");

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("ERROR: ID inválido");
  });

  it("debe devolver 400 si el ID es <= 0", async () => {
    const res = await request(app).delete("/api/contribution/0");

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("ERROR: ID inválido");
  });
});
