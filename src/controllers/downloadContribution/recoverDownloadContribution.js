// Importa la instancia de Prisma para interactuar con la base de datos
const prisma = require("../../config/prisma");

/**
 * Controlador para recuperar todas las contribuciones descargadas por un usuario autenticado.
 * Este endpoint asume que `req.user.id` ya fue establecido por un middleware de autenticación.
 *
 * @param {Object} req - Objeto de la solicitud (Request).
 * @param {Object} res - Objeto de la respuesta (Response).
 * @returns {Promise} - Respuesta en formato JSON con las contribuciones descargadas o mensaje de error.
 */
const recoverDownloadContributions = async (req, res) => {
  try {
    // Obtener el ID del usuario desde la sesión (req.user.id)
    const userId = req.user.id;

    // Realizar la consulta para obtener las contribuciones descargadas por el usuario
    const downloadContributions = await prisma.downloadContribution.findMany({
      where: {
        userId: userId, // Filtra por el ID del usuario
      },
      include: {
        contribution: {
          select: {
            id: true,
            title: true,
            description: true,
            url: true,
            user: {
              select: {
                name: true,
              },
            },
            type: true,
          },
        },
      },
    });

    // Si no hay contribuciones descargadas, devuelve un error 404
    if (!downloadContributions || downloadContributions.length === 0) {
      return res.status(200).json({
        success: true,
        message: "!FOUND: No se encontraron descargas.",
        savedContributions: downloadContributions,
      });
    }

    // Devuelve las desgargas del usuario con un estado 200 (OK)
    return res.status(200).json({
      success: true,
      message: "FOUND: Se encontraron descargas.",
      savedContributions: downloadContributions,
    });
  } catch (error) {
    // Captura cualquier error inesperado y devuelve un error 500
    return res.status(500).json({
      success: false,
      message: "ERROR: Se produjo un error interno del servidor",
    });
  }
};

// Exporta el controlador para que pueda ser utilizado en las rutas
module.exports = recoverDownloadContributions;
