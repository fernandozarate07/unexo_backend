// Importa la instancia de Prisma para interactuar con la base de datos
const prisma = require("../../config/prisma");

/**
 * Controlador para alternar la acción de guardar o quitar un aporte de la lista de aportes guardados.
 * Este endpoint verifica si el aporte ya está guardado para el usuario autenticado y lo agrega o elimina según corresponda.
 *
 * @param {Object} req - Objeto de la solicitud (Request).
 * @param {Object} res - Objeto de la respuesta (Response).
 * @returns {Promise} - Respuesta en formato JSON con el mensaje de éxito o error.
 */
const recoverSavedStateContribution = async (req, res) => {
  // Obtener el ID del usuario desde la sesión (req.user.id)
  const userId = req.user.id;

  // Obtener el ID de la contribución desde los parámetros de la URL y convertirlo a número
  const contributionId = parseInt(req.params.id);

  try {
    // Verificar si la contribución ya está guardada en la base de datos para este usuario
    const existingSavedContribution = await prisma.savedContribution.findUnique({
      where: {
        userId_contributionId: {
          userId, // ID del usuario
          contributionId, // ID de la contribución
        },
      },
    });

    // Si la contribución ya está guardada
    if (existingSavedContribution) {
      // Si ya está guardado, responder con el estado true
      return res.status(200).json({
        success: true,
        message: "SUCCESS: El aporte ya está guardado.",
        isSaved: true,
      });
    } else {
      // Si no está guardado, responder con el estado false
      return res.status(200).json({
        success: true,
        message: "SUCCESS: El aporte no está guardado.",
        isSaved: false,
      });
    }
  } catch (error) {
    // Si ocurre un error durante la operación, responder con código de estado 500 (INTERNAL SERVER ERROR)
    return res.status(500).json({
      success: false,
      message: "ERROR: Se produjo un error interno del servidor",
      isSaved: false,
    });
  }
};

// Exportar el controlador para ser utilizado en las rutas
module.exports = recoverSavedStateContribution;
