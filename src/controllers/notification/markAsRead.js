const prisma = require("../../config/prisma");

/**
 * Marca una notificación como leída en la base de datos.
 *
 * Este controlador recibe el ID de la notificación y actualiza su estado
 * a "leída" (isRead: true).
 *
 * @param {import("express").Request} req - Objeto de solicitud HTTP (contiene el ID de la notificación a marcar como leída).
 * @param {import("express").Response} res - Objeto de respuesta HTTP para enviar la respuesta.
 *
 * @returns {Object} Respuesta HTTP con el objeto de la notificación actualizada.
 * @throws {Object} Respuesta HTTP con mensaje de error si ocurre un problema durante la operación.
 */
const markAsRead = async (req, res) => {
  const { id } = req.params;

  try {
    // Actualizamos el estado de la notificación a "leída"
    const updatedNotification = await prisma.notification.update({
      where: { id: Number(id) },
      data: { isRead: true },
    });

    // Responder con el objeto de la notificación actualizada
    res.status(200).json(updatedNotification);
  } catch (error) {
    console.error("Error marcando notificación como leída:", error);
    // En caso de error, responder con un mensaje de error
    res.status(500).json({ error: "Error marcando notificación como leída" });
  }
};

module.exports = markAsRead;
