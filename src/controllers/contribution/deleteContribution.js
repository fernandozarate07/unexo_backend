const prisma = require("../../config/prisma");

/**
 * Controlador para eliminar una publicación (aporte) existente.
 *
 * Este controlador recibe un ID desde los parámetros de la URL, valida su formato,
 * verifica que la publicación exista en la base de datos y, si es así, la elimina.
 *
 * Respuestas posibles:
 * - 200: Publicación eliminada correctamente.
 * - 400: ID inválido (no es un entero positivo).
 * - 404: No se encontró ninguna publicación con ese ID.
 * - 500: Error interno del servidor al intentar eliminar la publicación.
 *
 * @param {import("express").Request} req - Objeto de solicitud HTTP, espera `req.params.id`.
 * @param {import("express").Response} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>} No devuelve ningún valor directamente, envía la respuesta HTTP.
 */
const deleteContribution = async (req, res) => {
  try {
    const id = Number(req.params.id);

    // Validar el ID
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: "ERROR: ID inválido" });
    }

    // Buscar la publicación con sus imágenes
    const contribution = await prisma.contribution.findUnique({
      where: { id: id },
    });

    if (!contribution) {
      return res.status(404).json({ message: "ERROR: Publicación no encontrada" });
    }

    // Eliminar la publicación de la BD
    await prisma.contribution.delete({
      where: { id: id },
    });

    res.json({ message: "SUCCESS: Publicación eliminada exitosamente" });
  } catch (error) {
    console.error("(deleteContribution) -> ERROR: Error eliminando la publicación:", error);
    res.status(500).json({ message: "ERROR: Error eliminando la publicación" });
  }
};

module.exports = deleteContribution;
