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
const savedContributionToggle = async (req, res) => {
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

    // Si la contribución ya está guardada, proceder a eliminarla
    if (existingSavedContribution) {
      // Eliminar el aporte guardado de la base de datos
      await prisma.savedContribution.delete({
        where: {
          userId_contributionId: {
            userId, // ID del usuario
            contributionId, // ID de la contribución
          },
        },
      });

      // Responder con mensaje de éxito y código de estado 200 (OK)
      return res.status(200).json({
        message: "SUCCESS: El aporte fue quitado de aportes guardados.",
      });
    } else {
      // Si la contribución no está guardada, proceder a agregarla
      await prisma.savedContribution.create({
        data: {
          userId, // ID del usuario
          contributionId, // ID de la contribución
        },
      });

      // Responder con mensaje de éxito y código de estado 201 (CREATED)
      return res.status(201).json({
        message: "SUCCESS: El aporte fue agregado a aportes guardados.",
      });
    }
  } catch (error) {
    // Si ocurre un error durante la operación, responder con código de estado 500 (INTERNAL SERVER ERROR)
    return res.status(500).json({
      message: "ERROR: Se produjo un error interno del servidor",
    });
  }
};

// Exportar el controlador para ser utilizado en las rutas
module.exports = savedContributionToggle;
