const prisma = require("../../config/prisma");

/**
 * Controlador para recuperar todas las contribuciones de un usuario
 *
 * @param {Object} req - Objeto de solicitud HTTP (contiene req.user.id)
 * @param {Object} res - Objeto de respuesta HTTP
 *
 * @returns {Object} - Respuesta HTTP:
 *  - 200: Lista de contribuciones del usuario
 *  - 500: Error interno del servidor
 */
const recoverUserContributions = async (req, res) => {
  try {
    const userId = req.user.id; // ID del usuario obtenido del middleware de autenticación

    // Obtener todas las contribuciones del usuario con sus relaciones
    const contributions = await prisma.contribution.findMany({
      where: {
        userId: userId,
      },
      include: {
        faculty: true,
        degree: true,
        academicYear: true,
        subject: true,
        type: true,
        likes: true,
      },
      orderBy: {
        createdAt: "desc", // Ordenar por fecha de creación (más reciente primero)
      },
    });

    return res.status(200).json({
      success: true,
      contributions: contributions,
    });
  } catch (error) {
    console.error("(recoverUserContributions) -> ", error);
    return res.status(500).json({
      success: false,
      message: "Error al recuperar las contribuciones del usuario",
      error: error.message,
    });
  }
};

module.exports = recoverUserContributions;
