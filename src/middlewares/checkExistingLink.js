// Importa la configuración de Prisma
const prisma = require("../config/prisma");

/**
 * Middleware para verificar si un enlace de Google Drive ya existe en la base de datos.
 * Este middleware se asegura de que el enlace no haya sido utilizado previamente en otro aporte,
 * excepto si el enlace pertenece al mismo aporte que está siendo editado.
 *
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @param {Function} next - La función que llama al siguiente middleware si el enlace no existe.
 *
 * @returns {Object} - Respuesta HTTP:
 *  - 400: Si falta el enlace o si ya existe en la base de datos.
 *  - 500: Si ocurre un error al realizar la consulta en la base de datos.
 *  - 200: Si el enlace no existe y se pasa al siguiente middleware.
 */
async function checkExistingLink(req, res, next) {
  const { linkDrive, contributionId } = req.body; // Desestructuramos el enlace y el ID del aporte desde el cuerpo de la solicitud.

  // Verifica si el enlace fue proporcionado en la solicitud
  if (!linkDrive) {
    return res.status(400).json({ success: false, message: "ERROR: Falta el link en la solicitud." });
  }

  try {
    // Verifica si el enlace ya existe en la base de datos utilizando Prisma, pero ignorando el aporte actual si contributionId está presente
    const existingContribution = await prisma.contribution.findFirst({
      where: {
        url: linkDrive, // Compara el enlace con los existentes en la base de datos.
        NOT: { id: contributionId }, // Excluye el aporte actual si contributionId está presente
      },
    });

    // Si el enlace ya existe en la base de datos, responde con un error 400.
    if (existingContribution) {
      return res.status(400).json({ success: false, message: "ERROR: El enlace ya ha sido utilizado en otro aporte." });
    }

    next(); // Si el enlace no existe, pasa al siguiente middleware.
  } catch (error) {
    return res.status(500).json({ success: false, message: "ERROR: Se produjo un error interno del servidor" });
  }
}

// Exporta el middleware para ser utilizado en otras partes de la aplicación.
module.exports = checkExistingLink;
