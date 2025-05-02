// src/test/contribution/recoverUserContributions.test.js

const prisma = require("../../config/prisma");
const recoverUserContributions = require("../../controllers/contribution/recoverUserContribution");

describe("recoverUserContributions controller", () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockReq = {
      user: { id: 1 }, // Usuario simulado
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it("debería recuperar correctamente las contribuciones del usuario y devolver 200", async () => {
    // Mock de los datos que findMany debería devolver
    prisma.contribution.findMany = jest.fn().mockResolvedValue([
      {
        id: 101,
        title: "Aporte 1",
        description: "Descripción del aporte 1",
        userId: 1,
        isActive: true,
        createdAt: new Date(),
        user: {
          id: 1,
          name: "Juan Pérez",
          email: "juan@example.com",
          profilePhoto: "https://example.com/photo.jpg",
        },
        faculty: { id: 1, name: "Facultad de Ingeniería" },
        degree: { id: 1, name: "Ingeniería en Sistemas" },
        academicYear: { id: 1, year: "3° Año" },
        subject: { id: 1, name: "Algoritmos" },
        type: { id: 1, name: "Apuntes" },
        likes: [],
        reports: [],
      },
    ]);

    await recoverUserContributions(mockReq, mockRes);

    expect(prisma.contribution.findMany).toHaveBeenCalledWith({
      where: {
        userId: 1,
        isActive: true,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            profilePhoto: true,
          },
        },
        faculty: true,
        degree: true,
        academicYear: true,
        subject: true,
        type: true,
        likes: true,
        reports: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: true,
      contributions: expect.any(Array),
    });
  });

  it("debería manejar errores internos y devolver 500", async () => {
    // Simulamos un error en la base de datos
    prisma.contribution.findMany = jest.fn().mockRejectedValue(new Error("Error de base de datos"));

    await recoverUserContributions(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: "Error al recuperar las contribuciones del usuario",
        error: expect.any(String),
      })
    );
  });
});
