// Dependencias
const { validationResult } = require("express-validator");
const cloudinary = require("../config/cloudinary");

/**
 * Extrae el public_id del archivo subido.
 * Este ID se usa para realizar limpieza de archivos en Cloudinary.
 *
 * @param {Object} file - El archivo subido.
 * @returns {string|null} - El public_id extraído o null si no se encuentra.
 */
const extractPublicId = (file) => {
  // Extraer el public_id de la ruta del archivo usando una expresión regular
  return file.filename || file.path.match(/\/upload\/v\d+\/(.+?)\.\w+$/)?.[1];
};

/**
 * Maneja la limpieza de archivos en Cloudinary.
 * Si ocurre un error durante la eliminación, se maneja adecuadamente.
 *
 * @param {Object} file - El archivo que será limpiado de Cloudinary.
 */
const handleCloudinaryCleanup = async (file) => {
  if (!file?.path) return; // Si no hay path, no se puede limpiar

  const publicId = extractPublicId(file); // Extraer el public_id del archivo
  if (!publicId) return; // Si no hay public_id, no hacer nada

  try {
    console.log("Se limpió Cloudinary:", publicId); // Log de éxito
    await cloudinary.uploader.destroy(publicId); // Eliminar el archivo de Cloudinary
  } catch (error) {
    console.error("Error: error al limpiar Cloudinary", error.message); // Log de error
  }
};

/**
 * Middleware para validar la solicitud de imagen.
 * Si hay errores de validación, se limpia el archivo de Cloudinary antes de responder con los errores.
 *
 * @param {Object} req - El objeto de solicitud que contiene el archivo.
 * @param {Object} res - El objeto de respuesta para enviar el resultado.
 * @param {Function} next - El siguiente middleware a ejecutar si la validación es exitosa.
 */
const validateImageRequest = async (req, res, next) => {
  const errors = validationResult(req); // Obtener los errores de la validación
  if (!errors.isEmpty()) {
    await handleCloudinaryCleanup(req.file); // Limpiar Cloudinary si hay errores
    return res.status(400).json({ errors: errors.array() }); // Devolver los errores
  }
  next(); // Si no hay errores, pasar al siguiente middleware
};

module.exports = validateImageRequest;
