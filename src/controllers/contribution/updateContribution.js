const prisma = require("../../config/prisma");

/**
 * Controlador para actualizar un aporte existente.
 *
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 *
 * @returns {Object} - Respuesta HTTP:
 *  - 200: Aporte actualizado correctamente.
 *  - 404: Aporte no encontrado o sin permisos.
 *  - 500: Error interno del servidor.
 */
const updateContribution = async (req, res) => {
  try {
    const { title, description, isActive, linkDrive } = req.body;
    const contributionId = parseInt(req.params.id, 10); // recuperar el ID del aporte desde la URL
    const userId = req.user.id; // ID del usuario (de la sesión/token)

    // Verificar si el aporte existe y pertenece al usuario
    const existingContribution = await prisma.contribution.findFirst({
      where: {
        id: contributionId,
        userId: userId, // Solo el dueño puede editarlo
      },
    });

    if (!existingContribution) {
      return res.status(404).json({
        success: false,
        message: "ERROR: Aporte no encontrado o no tienes permisos para editarlo",
      });
    }

    // Actualizar el aporte (solo campos proporcionados)
    const updatedContribution = await prisma.contribution.update({
      where: { id: contributionId },
      data: {
        title: title !== undefined ? title : existingContribution.title, // Si title es null/undefined, mantiene el anterior
        description: description !== undefined ? description : existingContribution.description,
        isActive: isActive !== undefined ? isActive : existingContribution.isActive, // Manejo explícito de booleanos
        url: linkDrive !== undefined ? linkDrive : existingContribution.url,
      },
    });

    return res.status(200).json({
      success: true,
      message: "SUCCESS: Aporte actualizado con éxito",
      aporte: updatedContribution,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "ERROR: Error al actualizar el aporte",
    });
  }
};

module.exports = updateContribution;
