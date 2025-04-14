const prisma = require("../../config/prisma");

const markAsRead = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedNotification = await prisma.notification.update({
      where: { id: Number(id) },
      data: { isRead: true },
    });

    res.status(200).json(updatedNotification);
  } catch (error) {
    console.error("Error marcando notificación como leída:", error);
    res.status(500).json({ error: "Error marcando notificación como leída" });
  }
};

module.exports = markAsRead;
