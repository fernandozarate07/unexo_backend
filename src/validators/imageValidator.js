// Constantes para validación de imagen
const ALLOWED_FORMATS = ["jpg", "jpeg", "png"]; // Formatos permitidos para la imagen
const ERROR_MESSAGES = {
  NO_IMAGE: "ERROR: Debe subir una imagen", // Mensaje de error si no se sube imagen
  INVALID_FORMAT: "ERROR: Formato no permitido. Solo JPG, JPEG o PNG", // Mensaje de error para formato no permitido
};

/**
 * Middleware para validar la imagen subida.
 * Verifica si se ha subido una imagen y si tiene un formato válido (JPG, JPEG o PNG).
 *
 * @param {Object} req - El objeto de solicitud que contiene el archivo.
 * @param {Object} res - El objeto de respuesta para enviar el resultado.
 * @param {Function} next - El siguiente middleware que se ejecutará si la validación es exitosa.
 *
 * @returns {Object} - Devuelve una respuesta de error en caso de no ser válida.
 */
const uploadImageValidator = (req, res, next) => {
  // Verificar si no se ha subido un archivo
  if (!req.file) {
    return res.status(400).json({ errors: [{ msg: ERROR_MESSAGES.NO_IMAGE }] });
  }

  // Obtener la extensión del archivo y convertirla a minúsculas
  const extension = req.file.originalname.split(".").pop().toLowerCase();

  // Validar si el formato es permitido
  if (!ALLOWED_FORMATS.includes(extension)) {
    return res.status(400).json({ errors: [{ msg: ERROR_MESSAGES.INVALID_FORMAT }] });
  }

  // Si la validación es exitosa, continuar con el siguiente middleware
  next();
};

module.exports = uploadImageValidator;
