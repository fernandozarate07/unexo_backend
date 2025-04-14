// Importamos la instancia de Prisma para interactuar con la base de datos
const prisma = require("../../config/prisma");

/**
 * Crea una notificación cuando un usuario recibe un "me gusta" en uno de sus aportes.
 *
 * @param {Object} userGetLike - Usuario que recibe el "me gusta".
 * @param {number|string} contributionId - ID del aporte que recibió el "me gusta".
 * @param {Object} userGiveLike - Usuario que dio el "me gusta".
 */
const notificationLike = async (userGetLike, contributionId, userGiveLike) => {
  // Consultamos el aporte para obtener el título
  const contribution = await prisma.contribution.findUnique({
    where: { id: parseInt(contributionId) },
    select: { title: true },
  });

  if (!contribution) return; // No generamos notificación si el aporte no existe

  // Creamos la notificación en la base de datos
  await prisma.notification.create({
    data: {
      userId: userGetLike.id,
      notificationTypeId: 1, // 1 = "like"
      message: `${userGiveLike.name} recomendó tu aporte: "${contribution.title}".`,
    },
  });
};

module.exports = notificationLike;
