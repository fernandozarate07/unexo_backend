// Importa la configuración de Prisma
const prisma = require("../config/prisma");

/**
 * Middleware para verificar si un enlace de Google Drive ya existe en la base de datos.
 * Este middleware se asegura de que el enlace no haya sido utilizado previamente en otro aporte.
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
  const { linkDrive } = req.body; // Desestructuramos el enlace desde el cuerpo de la solicitud.

  // Verifica si el enlace fue proporcionado en la solicitud
  if (!linkDrive) {
    return res.status(400).json({ message: "Falta el link en la solicitud." });
  }

  try {
    // Verifica si el enlace ya existe en la base de datos utilizando Prisma
    const existingContribution = await prisma.contribution.findFirst({
      where: {
        url: linkDrive, // Compara el enlace con los existentes en la base de datos.
      },
    });

    // Si el enlace ya existe en la base de datos, responde con un error 400.
    if (existingContribution) {
      return res.status(400).json({ message: "El enlace ya ha sido utilizado en otro aporte." });
    }

    next(); // Si el enlace no existe, pasa al siguiente middleware.
  } catch (error) {
    // En caso de error al consultar la base de datos, se captura y responde con un error 500.
    console.error("(checkExistingLink) -> ERROR:", error);
    return res.status(500).json({ message: "Error al verificar el enlace en la base de datos." });
  }
}

// Exporta el middleware para ser utilizado en otras partes de la aplicación.
module.exports = checkExistingLink;
