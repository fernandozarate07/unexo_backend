// Importa la instancia de Prisma Client para interactuar con la base de datos
const prisma = require("../config/prisma");

/**
 * Middleware para verificar si un aporte existe en la base de datos.
 * Si el aporte no se encuentra, responde con un error 404.
 * Si el aporte existe, pasa al siguiente middleware o controlador.
 *
 * @param {import('express').Request} req - El objeto de la solicitud HTTP.
 * @param {import('express').Response} res - El objeto de la respuesta HTTP.
 * @param {Function} next - La función para pasar al siguiente middleware o controlador.
 * @returns {void} Llama a `next()` si el aporte existe, o responde con un error 404 si no se encuentra.
 */
const checkExistingContribution = async (req, res, next) => {
  // Extrae el ID del aporte desde los parámetros de la solicitud
  const { id: contributionId } = req.params;

  try {
    // Consulta la base de datos para verificar si el aporte existe
    const contribution = await prisma.contribution.findUnique({
      where: { id: parseInt(contributionId) }, // Asegura que el ID sea un número entero
    });

    // Si no se encuentra el aporte, responde con un error 404
    if (!contribution) {
      return res.status(404).json({ success: false, message: "ERROR: Aporte no encontrado" });
    }

    // Si el aporte existe, pasa al siguiente middleware o controlador
    next();
  } catch (error) {
    // Si ocurre un error en la consulta o en cualquier parte del proceso, responde con un error 500
    return res.status(500).json({ success: false, message: "ERROR: Se produjo un error interno del servidor" });
  }
};

module.exports = checkExistingContribution;
