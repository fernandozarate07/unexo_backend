const prisma = require("../config/prisma");

const checkIsUser = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "ERROR: No estás autenticado." });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "ERROR: Usuario no encontrado." });
    }

    if (!["admin", "superadmin"].includes(user.role)) {
      return res.status(403).json({ success: false, message: "ERROR: No tenés permisos para acceder a este recurso." });
    }
    next(); // continúa si el el rol coincide con user, admin o superadmin
  } catch (error) {
    res.status(500).json({ success: false, message: "ERROR: Error interno del servidor." });
  }
};

module.exports = checkIsUser;
