const prisma = require("../../config/prisma");
const notificationLike = require("../notification/notificationLike");

/**
 * Recalcula y actualiza la cantidad total de likes que tiene un aporte.
 *
 * @param {number|string} contributionId - ID del aporte cuyo total de likes se va a actualizar.
 */
const updateLikeContribution = async (contributionId) => {
  const totalLikes = await prisma.likeContribution.count({
    where: { contributionId: parseInt(contributionId) },
  });

  await prisma.contribution.update({
    where: { id: parseInt(contributionId) },
    data: { likesCount: totalLikes },
  });
};

/**
 * Actualiza los puntos del usuario en base a la suma de todos los likes
 * que ha recibido en sus aportes.
 *
 * @param {number|string} userId - ID del usuario cuyo total de puntos se actualizará.
 */
const updateUserPoints = async (userId) => {
  const totalPoints = await prisma.contribution.aggregate({
    where: { userId },
    _sum: { likesCount: true },
  });

  await prisma.user.update({
    where: { id: userId },
    data: { points: totalPoints._sum.likesCount || 0 },
  });
};

/**
 * Agrega o elimina un "me gusta" en un aporte, actualizando las estadísticas correspondientes.
 *
 * Si el usuario ya ha dado "me gusta", lo elimina; si no, lo agrega. Luego actualiza el total
 * de likes del aporte y los puntos del usuario receptor del like. Si el like es nuevo y es para
 * otro usuario, también envía una notificación de "me gusta".
 *
 * @param {import("express").Request} req - Objeto de solicitud HTTP (contiene el ID del aporte y el usuario).
 * @param {import("express").Response} res - Objeto de respuesta HTTP para enviar la respuesta.
 */
const likeContributionToggle = async (req, res) => {
  try {
    const { id: contributionId } = req.params;
    const userId = req.user.id;

    // Verificamos que el aporte exista
    const contribution = await prisma.contribution.findUnique({
      where: { id: parseInt(contributionId) },
    });

    if (!contribution) {
      return res.status(404).json({ message: "Aporte no encontrado" });
    }

    // Obtenemos los usuarios involucrados: quien da el like y quien lo recibe
    const userGivingLike = await prisma.user.findUnique({
      where: { id: userId },
    });

    const userReceivingLike = await prisma.user.findUnique({
      where: { id: contribution.userId },
    });

    if (!userGivingLike || !userReceivingLike) {
      return res.status(400).json({ message: "Datos inválidos" });
    }

    // Verificamos si ya existe un like de este usuario al aporte
    const existingLike = await prisma.likeContribution.findUnique({
      where: {
        userId_contributionId: {
          userId,
          contributionId: parseInt(contributionId),
        },
      },
    });

    if (existingLike) {
      // Si ya existe el like, lo eliminamos
      await prisma.likeContribution.delete({
        where: { id: existingLike.id },
      });

      // Actualizamos los contadores de likes y puntos
      await updateLikeContribution(contributionId);
      await updateUserPoints(userReceivingLike.id);

      return res.json({ message: "Me gusta eliminado" });
    }

    // Si no existe el like, lo creamos
    await prisma.likeContribution.create({
      data: {
        userId,
        contributionId: parseInt(contributionId),
      },
    });

    // Actualizamos los contadores de likes y puntos
    await updateLikeContribution(contributionId);
    await updateUserPoints(userReceivingLike.id);

    // Si el like es de otro usuario, enviamos la notificación
    if (userId !== userReceivingLike.id) {
      await notificationLike(userReceivingLike, contributionId, userGivingLike);
    }

    return res.json({ message: "Me gusta agregado" });
  } catch (error) {
    console.error("(likeContributionToggle) ->", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

module.exports = likeContributionToggle;
