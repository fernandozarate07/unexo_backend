jest.mock("../../config/prisma", () => ({
  savedContribution: {
    findUnique: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  },
}));

const savedContributionToggle = require("../../controllers/savedContribution/savedContributionToggle");
const prisma = require("../../config/prisma");

describe("savedContributionToggle controller", () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = {
      user: { id: 1 },
      params: { id: "10" }, // se transforma a número con parseInt en el controlador
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  it("debería quitar un aporte guardado existente y devolver 200", async () => {
    prisma.savedContribution.findUnique.mockResolvedValue({ id: 1 });
    prisma.savedContribution.delete.mockResolvedValue();

    await savedContributionToggle(mockReq, mockRes);

    expect(prisma.savedContribution.findUnique).toHaveBeenCalledWith({
      where: {
        userId_contributionId: {
          userId: 1,
          contributionId: 10,
        },
      },
    });

    expect(prisma.savedContribution.delete).toHaveBeenCalledWith({
      where: {
        userId_contributionId: {
          userId: 1,
          contributionId: 10,
        },
      },
    });

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "SUCCESS: El aporte fue quitado de aportes guardados.",
    });
  });

  it("debería agregar un aporte si no estaba guardado y devolver 201", async () => {
    prisma.savedContribution.findUnique.mockResolvedValue(null);
    prisma.savedContribution.create.mockResolvedValue({ id: 1 });

    await savedContributionToggle(mockReq, mockRes);

    expect(prisma.savedContribution.create).toHaveBeenCalledWith({
      data: {
        userId: 1,
        contributionId: 10,
      },
    });

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "SUCCESS: El aporte fue agregado a aportes guardados.",
    });
  });

  it("debería manejar errores y devolver 500", async () => {
    prisma.savedContribution.findUnique.mockRejectedValue(new Error("DB error"));

    await savedContributionToggle(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "ERROR: Se produjo un error interno del servidor",
    });
  });
});
