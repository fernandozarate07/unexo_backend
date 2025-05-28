// Importa la instancia de Prisma para interactuar con la base de datos
const prisma = require("../../config/prisma");

/**
 * Controlador para recuperar todas las contribuciones guardadas por un usuario autenticado.
 * Este endpoint asume que `req.user.id` ya fue establecido por un middleware de autenticación.
 *
 * @param {Object} req - Objeto de la solicitud (Request).
 * @param {Object} res - Objeto de la respuesta (Response).
 * @returns {Promise} - Respuesta en formato JSON con las contribuciones guardadas o mensaje de error.
 */
const recoverUserSavedContributions = async (req, res) => {
  try {
    // Obtener el ID del usuario desde la sesión (req.user.id)
    const userId = req.user.id;

    // Realizar la consulta para obtener las contribuciones guardadas por el usuario
    const savedContributions = await prisma.savedContribution.findMany({
      where: {
        userId: userId, // Filtra por el ID del usuario
      },
      include: {
        contribution: {
          select: {
            id: true,
            title: true,
            description: true,
            // Excluís 'url' simplemente no incluyéndolo en este select
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

    // Si no hay contribuciones guardadas, devuelve un error 404
    if (!savedContributions || savedContributions.length === 0) {
      return res.status(200).json({
        success: true,
        message: "!FOUND: No se encontro aportes guardados",
        savedContributions: savedContributions,
      });
    }

    // Devuelve las contribuciones guardadas con un estado 200 (OK)
    return res.status(200).json({
      success: true,
      savedContributions: savedContributions,
    });
  } catch (error) {
    // Captura cualquier error inesperado y devuelve un error 500
    return res.status(500).json({ success: false, message: "ERROR: Se produjo un error interno del servidor" });
  }
};

// Exporta el controlador para que pueda ser utilizado en las rutas
module.exports = recoverUserSavedContributions;
