// Importa la instancia de Prisma para interactuar con la base de datos
const prisma = require("../../config/prisma");

/**
 * Controlador para alternar la acción de guardar o quitar un like de la lista de base de datos.
 * Este endpoint verifica si el like ya está guardado para el usuario autenticado y lo agrega o elimina según corresponda.
 *
 * @param {Object} req - Objeto de la solicitud (Request).
 * @param {Object} res - Objeto de la respuesta (Response).
 * @returns {Promise} - Respuesta en formato JSON con el mensaje de éxito o error.
 */
const recoverLikeState = async (req, res) => {
  // Obtener el ID del usuario desde la sesión (req.user.id)
  const userId = req.user.id;

  // Obtener el ID de la contribución desde los parámetros de la URL y convertirlo a número
  const contributionId = parseInt(req.params.id);

  try {
    // Verificar si  el like  ya está guardada en la base de datos para este usuario
    const existingLike = await prisma.likeContribution.findUnique({
      where: {
        userId_contributionId: {
          userId, // ID del usuario
          contributionId, // ID de la contribución
        },
      },
    });

    // Si el like ya está guardado
    if (existingLike) {
      // Si ya está guardado, responder con el estado true
      return res.status(200).json({
        success: true,
        message: "El like ya está guardado.",
        isSaved: true,
      });
    } else {
      // Si no está guardado, responder con el estado false
      return res.status(200).json({
        success: true,
        message: "El like no está guardado.",
        isSaved: false,
      });
    }
  } catch (error) {
    // Si ocurre un error durante la operación, responder con código de estado 500 (INTERNAL SERVER ERROR)
    return res.status(500).json({
      success: false,
      message: "Se produjo un error interno del servidor",
      isSaved: false,
    });
  }
};

// Exportar el controlador para ser utilizado en las rutas
module.exports = recoverLikeState;
