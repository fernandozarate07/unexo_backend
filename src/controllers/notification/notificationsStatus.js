const prisma = require("../../config/prisma");

/**
 * Controlador para obtener las notificaciones de un usuario.
 * Recupera las últimas 20 notificaciones del usuario autenticado, ordenadas por fecha de creación.
 *
 * @param {import("express").Request} req - Objeto de solicitud HTTP, contiene la información del usuario autenticado.
 * @param {import("express").Response} res - Objeto de respuesta HTTP, utilizado para enviar la respuesta con las notificaciones.
 *
 * @returns {Object} Respuesta con las notificaciones del usuario en formato JSON.
 *    - `status`: Código de estado HTTP (200 si exitoso, 500 si ocurre un error).
 *    - `notifications`: Array de notificaciones del usuario, con información sobre el tipo de notificación y mensaje.
 *
 * @throws {Error} Si ocurre un error en la consulta a la base de datos, se devuelve un código 500.
 */
const notificationsStatus = async (req, res) => {
  const userId = req.user.id;

  try {
    // Recupera las últimas 20 notificaciones para el usuario, ordenadas por la fecha de creación
    const notifications = await prisma.notification.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
      take: 20, // Limita la cantidad de notificaciones a las últimas 20
      include: {
        notificationType: true, // Incluye el tipo de notificación (ej. like, comentario)
      },
    });

    return res.status(200).json(notifications);
  } catch (error) {
    console.error("Error al obtener las notificaciones:", error);
    return res.status(500).json({ error: "Error interno al obtener las notificaciones" });
  }
};

module.exports = notificationsStatus;
