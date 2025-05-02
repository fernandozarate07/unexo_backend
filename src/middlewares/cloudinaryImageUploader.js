// Dependencias
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Constantes para configuración de subida de fotos de perfil
const CLOUDINARY_FOLDER = "Unexo/ProfilePhotos"; // Carpeta en Cloudinary donde se almacenarán las fotos
const ALLOWED_FORMATS = ["jpg", "jpeg", "png"]; // Tipos de archivo permitidos
const MAX_FILE_SIZE = 2 * 1024 * 1024; // Tamaño máximo de archivo permitido (2MB)

// Configuración de almacenamiento en Cloudinary utilizando multer-storage-cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: CLOUDINARY_FOLDER, // Carpeta en Cloudinary
    allowed_formats: ALLOWED_FORMATS, // Formatos permitidos
  },
});

/**
 * Middleware para la subida de la foto de perfil.
 * Configura multer para usar CloudinaryStorage y controlar el tamaño del archivo.
 * Solo se permite un archivo por vez y el tamaño máximo es de 2MB.
 *
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 * @param {Function} next - El siguiente middleware en la cadena.
 */
const uploadProfilePicture = multer({
  storage, // Configuración de almacenamiento en Cloudinary
  limits: { fileSize: MAX_FILE_SIZE }, // Limite de tamaño de archivo
}).single("image"); // Permitir solo un archivo de imagen con el nombre "image" en el formulario

module.exports = uploadProfilePicture;
