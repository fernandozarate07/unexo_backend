/**
 * Middleware para verificar si el enlace de Google Drive proporcionado es público.
 * Este middleware extrae el ID del enlace de Google Drive, verifica si el enlace es válido y luego realiza una solicitud
 * para comprobar si el archivo en Google Drive es accesible de forma pública.
 *
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @returns {void} Responde con el estado correspondiente:
 *                  - 400 si falta el enlace o si el enlace es inválido.
 *                  - 403 si el enlace no es público.
 *                  - 200 si el enlace es público.
 *                  - 500 si ocurre un error al realizar la verificación.
 */
async function checkIsPublicLink(req, res) {
  const { linkDrive } = req.body;

  // Verificar si se proporcionó el enlace
  if (!linkDrive) {
    return res.status(400).json({ message: "Falta el enlace en la solicitud." });
  }

  // Extraer el ID del enlace de Google Drive utilizando expresiones regulares
  const match = linkDrive.match(/\/d\/([^\/]+)/) || linkDrive.match(/id=([^&]+)/);
  const fileId = match ? match[1] : null;

  // Verificar si el ID es válido
  if (!fileId) {
    return res.status(400).json({ message: "Enlace de Google Drive inválido." });
  }

  // Crear la URL de previsualización del archivo en Google Drive
  const previewUrl = `https://drive.google.com/file/d/${fileId}/preview`;

  try {
    // Realizar una solicitud HEAD para verificar si el archivo es accesible
    const response = await fetch(previewUrl, {
      method: "HEAD",
      redirect: "manual", // No seguir redirecciones
    });

    // Verificar si la respuesta indica que el archivo es público
    const isPublic = response.status === 200 || response.status === 403;

    // Si el enlace no es público, devolver un error 403
    if (!isPublic) {
      return res.status(403).json({ message: "El enlace de Google Drive no es público." });
    }

    // Si el enlace es público, devolver una respuesta exitosa
    return res.status(200).json({ message: "El enlace de Google Drive es público." });
  } catch (error) {
    // Manejo de errores en caso de que ocurra una excepción
    console.error("Error en checkIsPublicLink:", error);
    return res.status(500).json({ message: "Error al verificar el enlace de Google Drive." });
  }
}

module.exports = checkIsPublicLink;
