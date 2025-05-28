// Dependencias
const prisma = require("../../../config/prisma");
const cloudinary = require("../../../config/cloudinary");

// Ruta en Cloudinary para las fotos de perfil
const PROFILE_PHOTOS_PATH = "Unexo/ProfilePhotos";

/**
 * Extrae el public_id de la URL de Cloudinary.
 *
 * @param {string} url - La URL de la foto de perfil almacenada en Cloudinary.
 * @returns {string|null} - El public_id extraído o null si no se encuentra.
 */
const getPublicId = (url) => {
  return url?.split("/").pop().split(".")[0]; // Extrae el public_id de la URL
};

/**
 * Maneja la subida y actualización de la foto de perfil.
 * Si el usuario ya tiene una foto de perfil, se elimina antes de actualizarla.
 *
 * @param {Object} req - El objeto de solicitud, que contiene el archivo de la foto de perfil y los datos del usuario.
 * @param {Object} res - El objeto de respuesta para devolver la respuesta al cliente.
 */
const handleProfilePhoto = async (req, res) => {
  // Validar si se ha subido un archivo
  if (!req.file?.path) {
    return res.status(400).json({ message: "No image provided" });
  }

  try {
    const { id: userId } = req.user; // Extraer el id del usuario desde la sesión
    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { profilePhoto: true }, // Obtener la foto de perfil actual
    });

    // Si el usuario ya tiene una foto de perfil, eliminar la anterior de Cloudinary
    if (currentUser?.profilePhoto) {
      const publicId = getPublicId(currentUser.profilePhoto); // Extraer el public_id
      if (publicId) {
        // Eliminar la foto anterior de Cloudinary
        await cloudinary.uploader.destroy(`${PROFILE_PHOTOS_PATH}/${publicId}`);
      }
    }

    // Actualizar la foto de perfil en la base de datos
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { profilePhoto: req.file.path }, // Establecer la nueva foto de perfil
    });

    // Responder con el mensaje adecuado
    res.status(200).json({
      success: true,
      message: currentUser?.profilePhoto ? "Profile updated" : "Upload successful",
      profilePhoto: updatedUser.profilePhoto, // Devolver la nueva foto de perfil
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "ERROR: Error la intentar subir la foto" }); // Respuesta en caso de error
  }
};
module.exports = handleProfilePhoto;
