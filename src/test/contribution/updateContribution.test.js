// src/test/contribution/updateContribution.test.js

// Importamos las dependencias necesarias
const prisma = require("../../config/prisma"); // Conexión a la base de datos con Prisma
const updateContribution = require("../../controllers/contribution/updateContribution"); // Controlador que vamos a probar

// Descripción del test suite para el controlador `updateContribution`
describe("updateContribution controller", () => {
  // Definimos los mocks que vamos a utilizar
  let mockReq; // Mock de la solicitud (req)
  let mockRes; // Mock de la respuesta (res)

  // Configuración antes de cada test
  beforeEach(() => {
    // Inicializamos los valores de `mockReq` y `mockRes`
    mockReq = {
      body: {}, // El cuerpo de la solicitud estará vacío por defecto
      user: { id: 1 }, // Simulamos que el usuario tiene ID 1
    };
    mockRes = {
      status: jest.fn().mockReturnThis(), // Mock de la función `status`
      json: jest.fn(), // Mock de la función `json`
    };
    jest.clearAllMocks(); // Limpiamos los mocks antes de cada test
  });

  // Test 1: Comprobamos que el aporte se actualiza correctamente y devuelve un código 200
  it("debería actualizar un aporte correctamente y devolver 200", async () => {
    // Mock de los métodos de Prisma
    prisma.contribution.findFirst = jest.fn().mockResolvedValue({
      id: 123,
      title: "Aporte anterior",
      description: "Descripción anterior",
      isActive: true,
      url: "https://drive.google.com/old",
    });

    prisma.contribution.update = jest.fn().mockResolvedValue({
      id: 123,
      title: "Nuevo título",
      description: "Nueva descripción",
      isActive: false,
      url: "https://drive.google.com/new",
    });

    // Mock de los datos que se envían en la solicitud
    mockReq.body = {
      contributionId: 123,
      title: "Nuevo título",
      description: "Nueva descripción",
      isActive: false,
      linkDrive: "https://drive.google.com/new",
    };

    // Ejecutamos la función del controlador
    await updateContribution(mockReq, mockRes);

    // Comprobamos que se haya llamado a `findFirst` con los parámetros correctos
    expect(prisma.contribution.findFirst).toHaveBeenCalledWith({
      where: { id: 123, userId: 1 },
    });

    // Comprobamos que se haya llamado a `update` con los datos correctos
    expect(prisma.contribution.update).toHaveBeenCalledWith({
      where: { id: 123 },
      data: {
        title: "Nuevo título",
        description: "Nueva descripción",
        isActive: false,
        url: "https://drive.google.com/new",
      },
    });

    // Comprobamos que la respuesta tiene el código de estado 200
    expect(mockRes.status).toHaveBeenCalledWith(200);

    // Comprobamos que la respuesta contiene el mensaje de éxito
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Aporte actualizado con éxito",
      aporte: expect.any(Object),
    });
  });

  // Test 2: Comprobamos que se devuelve un código 404 si el aporte no existe o no pertenece al usuario
  it("debería devolver 404 si el aporte no existe o no pertenece al usuario", async () => {
    // Mock de `findFirst` para que devuelva null (aporte no encontrado)
    prisma.contribution.findFirst = jest.fn().mockResolvedValue(null);

    // Mock de los datos de la solicitud
    mockReq.body = {
      contributionId: 999, // ID de aporte que no existe
    };

    // Ejecutamos la función del controlador
    await updateContribution(mockReq, mockRes);

    // Comprobamos que se haya llamado a `findFirst` con los parámetros correctos
    expect(prisma.contribution.findFirst).toHaveBeenCalledWith({
      where: { id: 999, userId: 1 },
    });

    // Comprobamos que la respuesta contiene el código de estado 404
    expect(mockRes.status).toHaveBeenCalledWith(404);

    // Comprobamos que la respuesta contiene el mensaje de error adecuado
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Aporte no encontrado o no tienes permisos para editarlo",
    });

    // Comprobamos que no se haya llamado a `update` en este caso
    expect(prisma.contribution.update).not.toHaveBeenCalled();
  });

  // Test 3: Comprobamos que se maneja correctamente un error interno y se devuelve un código 500
  it("debería manejar errores internos y devolver 500", async () => {
    // Mock de `findFirst` para que devuelva un error
    prisma.contribution.findFirst = jest.fn().mockRejectedValue(new Error("Error de base de datos"));

    // Mock de los datos de la solicitud
    mockReq.body = {
      contributionId: 123, // ID de aporte que causa el error
    };

    // Ejecutamos la función del controlador
    await updateContribution(mockReq, mockRes);

    // Comprobamos que la respuesta tiene el código de estado 500
    expect(mockRes.status).toHaveBeenCalledWith(500);

    // Comprobamos que la respuesta contiene el mensaje de error adecuado
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "ERROR: Error al actualizar el aporte",
        error: expect.any(String),
      })
    );
  });
});
