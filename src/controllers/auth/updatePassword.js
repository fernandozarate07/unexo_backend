const bcrypt = require("bcryptjs");
const prisma = require("../../config/prisma");

const updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id; // Asegúrate de que el id del usuario esté disponible a través de la sesión

  try {
    // Obtener el usuario por ID
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(401).json({ success: false, message: "ERROR: Usuario no encontrado" });
    }

    // Verificar que la contraseña actual coincida
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: "ERROR: La contraseña actual es incorrecta" });
    }

    // Encriptar la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar la contraseña en la base de datos
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return res.status(200).json({ success: true, message: "SUCCESS: Contraseña cambiada con éxito" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "ERROR: Error interno del servidor" });
  }
};

module.exports = updatePassword;
