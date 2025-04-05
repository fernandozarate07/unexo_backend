const prisma = require("../../../config/prisma");

// Reset dynamic data
const resetDynamicData = async (req, res) => {
  try {
    await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS=0`);

    // Eliminar datos dinámicos
    await prisma.notification.deleteMany({});
    await prisma.report.deleteMany({});
    await prisma.likeContribution.deleteMany({});
    await prisma.contribution.deleteMany({});
    await prisma.user.deleteMany({});

    // Reiniciar AUTO_INCREMENT
    await prisma.$executeRawUnsafe(`ALTER TABLE notification AUTO_INCREMENT = 1`);
    await prisma.$executeRawUnsafe(`ALTER TABLE report AUTO_INCREMENT = 1`);
    await prisma.$executeRawUnsafe(`ALTER TABLE likeContribution AUTO_INCREMENT = 1`);
    await prisma.$executeRawUnsafe(`ALTER TABLE contribution AUTO_INCREMENT = 1`);
    await prisma.$executeRawUnsafe(`ALTER TABLE user AUTO_INCREMENT = 1`);

    await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS=1`);

    res.status(200).json({ message: "Datos dinámicos reiniciados correctamente" });
  } catch (error) {
    console.error("(reset_data.js) -> ERROR al resetear datos dinámicos", error);
    res.status(500).json({ message: "No se pudo resetear los datos dinámicos" });
  }
};

// Reset static data
const resetStaticData = async (req, res) => {
  try {
    await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS=0`);

    await prisma.$executeRawUnsafe(`DELETE FROM subject`);
    await prisma.$executeRawUnsafe(`DELETE FROM academicYear`);
    await prisma.$executeRawUnsafe(`DELETE FROM degree`);
    await prisma.$executeRawUnsafe(`DELETE FROM faculty`);
    await prisma.$executeRawUnsafe(`DELETE FROM contributionType`);

    // Reiniciar AUTO_INCREMENT
    await prisma.$executeRawUnsafe(`ALTER TABLE subject AUTO_INCREMENT = 1`);
    await prisma.$executeRawUnsafe(`ALTER TABLE academicYear AUTO_INCREMENT = 1`);
    await prisma.$executeRawUnsafe(`ALTER TABLE degree AUTO_INCREMENT = 1`);
    await prisma.$executeRawUnsafe(`ALTER TABLE faculty AUTO_INCREMENT = 1`);
    await prisma.$executeRawUnsafe(`ALTER TABLE contributionType AUTO_INCREMENT = 1`);

    await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS=1`);

    res.status(200).json({ message: "Datos estáticos reiniciados correctamente" });
  } catch (error) {
    console.error("(reset_data.js) -> ERROR al resetear datos estáticos", error);
    res.status(500).json({ message: "No se pudo resetear los datos estáticos" });
  }
};

module.exports = { resetDynamicData, resetStaticData };
