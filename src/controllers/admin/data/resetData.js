const prisma = require("../../../config/prisma");

/**
 * Elimina todos los datos dinámicos de la base de datos,
 * desactiva temporalmente las restricciones de claves foráneas
 * y reinicia los contadores AUTO_INCREMENT de las tablas afectadas.
 *
 * Datos dinámicos incluyen: notificaciones, reportes, likes, aportes y usuarios.
 *
 * @param {Object} req - El objeto de la solicitud HTTP que contiene los datos de la petición.
 * @param {Object} res - El objeto de la respuesta HTTP que se utilizará para enviar la respuesta al cliente.
 *
 * @returns {Object} Respuesta HTTP con un mensaje de éxito o error.
 */
const resetDynamicData = async (req, res) => {
  try {
    // Desactivar restricciones de claves foráneas
    await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS=0`);

    // Eliminar registros dinámicos
    await prisma.notification.deleteMany({});
    await prisma.report.deleteMany({});
    await prisma.likeContribution.deleteMany({});
    await prisma.contribution.deleteMany({});
    await prisma.user.deleteMany({});

    // Reiniciar AUTO_INCREMENT de cada tabla
    await prisma.$executeRawUnsafe(`ALTER TABLE notification AUTO_INCREMENT = 1`);
    await prisma.$executeRawUnsafe(`ALTER TABLE report AUTO_INCREMENT = 1`);
    await prisma.$executeRawUnsafe(`ALTER TABLE likeContribution AUTO_INCREMENT = 1`);
    await prisma.$executeRawUnsafe(`ALTER TABLE contribution AUTO_INCREMENT = 1`);
    await prisma.$executeRawUnsafe(`ALTER TABLE user AUTO_INCREMENT = 1`);

    // Reactivar las restricciones
    await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS=1`);

    // Enviar respuesta exitosa
    res.status(200).json({ message: "Datos dinámicos reiniciados correctamente" });
  } catch (error) {
    console.error("(reset_data.js) -> ERROR al resetear datos dinámicos", error);
    res.status(500).json({ message: "No se pudo resetear los datos dinámicos" });
  }
};

/**
 * Elimina todos los datos estáticos de la base de datos,
 * desactiva temporalmente las restricciones de claves foráneas
 * y reinicia los contadores AUTO_INCREMENT de las tablas afectadas.
 *
 * Datos estáticos incluyen: asignaturas, años académicos, carreras,
 * facultades, tipos de aporte, tipos de notificación y motivos de reporte.
 *
 * @param {Object} req - El objeto de la solicitud HTTP que contiene los datos de la petición.
 * @param {Object} res - El objeto de la respuesta HTTP que se utilizará para enviar la respuesta al cliente.
 *
 * @returns {Object} Respuesta HTTP con un mensaje de éxito o error.
 */
const resetStaticData = async (req, res) => {
  try {
    // Desactivar restricciones de claves foráneas
    await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS=0`);

    // Eliminar registros estáticos
    await prisma.$executeRawUnsafe(`DELETE FROM subject`);
    await prisma.$executeRawUnsafe(`DELETE FROM academicYear`);
    await prisma.$executeRawUnsafe(`DELETE FROM degree`);
    await prisma.$executeRawUnsafe(`DELETE FROM faculty`);
    await prisma.$executeRawUnsafe(`DELETE FROM contributionType`);
    await prisma.$executeRawUnsafe(`DELETE FROM notificationType`);
    await prisma.$executeRawUnsafe(`DELETE FROM reportReason`);

    // Reiniciar AUTO_INCREMENT de cada tabla
    await prisma.$executeRawUnsafe(`ALTER TABLE subject AUTO_INCREMENT = 1`);
    await prisma.$executeRawUnsafe(`ALTER TABLE academicYear AUTO_INCREMENT = 1`);
    await prisma.$executeRawUnsafe(`ALTER TABLE degree AUTO_INCREMENT = 1`);
    await prisma.$executeRawUnsafe(`ALTER TABLE faculty AUTO_INCREMENT = 1`);
    await prisma.$executeRawUnsafe(`ALTER TABLE contributionType AUTO_INCREMENT = 1`);
    await prisma.$executeRawUnsafe(`ALTER TABLE notificationType AUTO_INCREMENT = 1`);
    await prisma.$executeRawUnsafe(`ALTER TABLE reportReason AUTO_INCREMENT = 1`);

    // Reactivar las restricciones
    await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS=1`);

    // Enviar respuesta exitosa
    res.status(200).json({ message: "Datos estáticos reiniciados correctamente" });
  } catch (error) {
    console.error("(reset_data.js) -> ERROR al resetear datos estáticos", error);
    res.status(500).json({ message: "No se pudo resetear los datos estáticos" });
  }
};

module.exports = { resetDynamicData, resetStaticData };
