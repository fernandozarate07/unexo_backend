// Mock manual de Prisma antes de importar el controlador
jest.mock("../../config/prisma", () => ({
  user: {
    update: jest.fn(), // Mock de la función update de Prisma para simular la actualización de un usuario
  },
}));

// Importamos los módulos necesarios para el test
const prisma = require("../../config/prisma"); // Importa la configuración de Prisma para usarla en el test
const updateName = require("../../controllers/user/data/updateName"); // Importa el controlador que vamos a probar

/**
 * Descripción general de los test para el controlador `updateName`.
 * Se probará el comportamiento esperado de la actualización de nombre de usuario,
 * así como la gestión de errores.
 */
describe("Controlador updateName", () => {
  let req, res;

  /**
   * Configuración inicial antes de cada prueba.
   * Crea los objetos `req` (solicitud) y `res` (respuesta) necesarios para las pruebas.
   */
  beforeEach(() => {
    req = {
      body: { name: "Nuevo Nombre" }, // Simula el cuerpo de la solicitud con un nuevo nombre
      user: { id: "userId123" }, // Simula que el ID del usuario proviene de la sesión
    };

    res = {
      status: jest.fn().mockReturnThis(), // Mock de la función `status` para la respuesta
      json: jest.fn(), // Mock de la función `json` para enviar la respuesta en formato JSON
    };
  });

  /**
   * Limpieza después de cada prueba.
   * Se asegura de que no haya efectos colaterales entre pruebas.
   */
  afterEach(() => {
    jest.clearAllMocks(); // Limpia los mocks después de cada prueba
  });

  /**
   * Prueba para verificar que el controlador actualiza correctamente el nombre del usuario.
   * Se simula una respuesta exitosa de Prisma.
   */
  it("debería actualizar el nombre exitosamente", async () => {
    // Simulamos que Prisma responde correctamente con los datos del usuario actualizado
    prisma.user.update.mockResolvedValue({
      id: "userId123",
      name: "Nuevo Nombre",
    });

    // Ejecutamos el controlador con la solicitud y respuesta simuladas
    await updateName(req, res);

    // Verificamos que Prisma haya sido llamado correctamente
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: "userId123" },
      data: { name: "Nuevo Nombre" },
    });

    // Verificamos que la respuesta haya sido correcta
    expect(res.status).toHaveBeenCalledWith(200); // Esperamos un estado 200
    expect(res.json).toHaveBeenCalledWith({
      message: "Nombre actualizado correctamente", // Mensaje de éxito
      user: { id: "userId123", name: "Nuevo Nombre" }, // Datos del usuario actualizado
    });
  });

  /**
   * Prueba para verificar que el controlador maneja errores correctamente.
   * Se simula un error de base de datos.
   */
  it("debería manejar errores y devolver 500", async () => {
    // Simulamos que Prisma responde con un error
    prisma.user.update.mockRejectedValue(new Error("Error de base de datos"));

    // Ejecutamos el controlador con la solicitud y respuesta simuladas
    await updateName(req, res);

    // Verificamos que se haya devuelto un error 500
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "ERROR: Error al actualizar el nombre", // Mensaje de error
    });
  });
});
