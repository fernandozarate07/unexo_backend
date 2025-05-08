const prisma = require("../config/prisma");

async function updateNexoPoints({ userId, amount, operation }) {
  if (!["add", "sub"].includes(operation)) {
    throw new Error("Operación inválida. Debe ser 'add' o 'sub'.");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { points: true },
  });

  if (!user) {
    throw new Error("ERROR: Usuario no encontrado.");
  }

  if (operation === "sub") {
    if (user.points < amount) {
      const error = new Error("ERROR: No tienes suficientes nexopoint.");
      error.status = 400;
      throw error;
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        points: {
          decrement: amount,
        },
      },
    });
  } else if (operation === "add") {
    await prisma.user.update({
      where: { id: userId },
      data: {
        points: {
          increment: amount,
        },
      },
    });
  }
}
module.exports = updateNexoPoints;
