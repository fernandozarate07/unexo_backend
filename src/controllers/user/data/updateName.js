const prisma = require("../../../config/prisma");

/**
 * Controlador para actualizar el nombre del usuario en la base de datos.
 *
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Response} JSON con mensaje de éxito o error.
 */
const updateName = async (req, res) => {
  const { name } = req.body;
  const userId = req.user.id; // Se asume que el ID de usuario viene desde la sesión activa

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name },
    });

    return res.status(200).json({
      success: true,
      message: "SUCCESS: Nombre actualizado correctamente",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "ERROR: Error al actualizar el nombre",
    });
  }
};

module.exports = updateName;
