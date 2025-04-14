const prisma = require("../../config/prisma");

// Lógica para obtener las notificaciones del usuario
const notificationsStatus = async (req, res) => {
  const userId = req.user.id;

  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
      take: 20,
      include: {
        notificationType: true,
      },
    });

    return res.status(200).json(notifications);
  } catch (error) {
    console.error("Error al obtener las notificaciones:", error);
    return res.status(500).json({ error: "Error interno al obtener las notificaciones" });
  }
};

module.exports = notificationsStatus;
