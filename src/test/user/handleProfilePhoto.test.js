// ==============================
// Test: handleProfilePhoto
// ==============================

// Dependencias
const handleProfilePhoto = require("../../controllers/user/uploadProfilePhoto/handleProfilePhoto");
const prisma = require("../../config/prisma");
const cloudinary = require("../../config/cloudinary");

// NOTA: No se usa jest.mock() global.
// Los métodos de prisma y cloudinary se mockean manualmente en cada test.

describe("handleProfilePhoto", () => {
  let req, res;

  // -------------------------------------
  // Setup: Se ejecuta antes de cada test
  // -------------------------------------
  beforeEach(() => {
    req = {
      user: { id: "userId123" },
      file: { path: "https://res.cloudinary.com/demo/image/upload/v12345/profile.jpg" },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock manual de métodos necesarios
    prisma.user = {
      findUnique: jest.fn().mockResolvedValue({ profilePhoto: null }),
      update: jest.fn().mockResolvedValue({ profilePhoto: req.file.path }),
    };

    cloudinary.uploader = {
      destroy: jest.fn(),
    };
  });

  // -------------------------------------
  // Cleanup: Limpia los mocks luego de cada test
  // -------------------------------------
  afterEach(() => {
    jest.clearAllMocks();
  });

  // -------------------------------------
  // Casos de Test
  // -------------------------------------

  it("debería subir una nueva foto de perfil si no existe una anterior", async () => {
    // Arrange -> hecho en beforeEach

    // Act
    await handleProfilePhoto(req, res);

    // Assert
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: "userId123" },
      select: { profilePhoto: true },
    });

    expect(cloudinary.uploader.destroy).not.toHaveBeenCalled();

    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: "userId123" },
      data: { profilePhoto: req.file.path },
    });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Upload successful",
      profilePhoto: req.file.path,
    });
  });

  it("debería eliminar la foto anterior y subir la nueva si ya existe una foto previa", async () => {
    // Arrange
    prisma.user.findUnique.mockResolvedValue({
      profilePhoto: "https://res.cloudinary.com/demo/image/upload/v12345/oldphoto.jpg",
    });

    // Act
    await handleProfilePhoto(req, res);

    // Assert
    expect(cloudinary.uploader.destroy).toHaveBeenCalledWith("Unexo/ProfilePhotos/oldphoto");

    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: "userId123" },
      data: { profilePhoto: req.file.path },
    });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Profile updated",
      profilePhoto: req.file.path,
    });
  });

  it("debería devolver error 400 si no se envía una imagen", async () => {
    // Arrange
    req.file = undefined;

    // Act
    await handleProfilePhoto(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "No image provided",
    });

    expect(prisma.user.findUnique).not.toHaveBeenCalled();
    expect(prisma.user.update).not.toHaveBeenCalled();
    expect(cloudinary.uploader.destroy).not.toHaveBeenCalled();
  });

  it("debería devolver error 500 si ocurre un fallo interno", async () => {
    // Arrange
    prisma.user.findUnique.mockRejectedValue(new Error("Database error"));

    // Act
    await handleProfilePhoto(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Image processing failed",
    });
  });
});
