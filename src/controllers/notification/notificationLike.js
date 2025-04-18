// Importamos la instancia de Prisma para interactuar con la base de datos
const prisma = require("../../config/prisma");

/**
 * Crea una notificación cuando un usuario recibe un "me gusta" en uno de sus aportes.
 *
 * Esta función consulta el título del aporte que recibió el "me gusta" y luego crea
 * una notificación en la base de datos para el usuario que recibe el "me gusta".
 * La notificación incluye un mensaje que informa al usuario que su aporte fue recomendado por otro.
 *
 * @param {Object} userGetLike - Usuario que recibe el "me gusta". Contiene los detalles del usuario que recibe la notificación.
 * @param {number|string} contributionId - ID del aporte que recibió el "me gusta". Este ID se usa para recuperar el título del aporte.
 * @param {Object} userGiveLike - Usuario que dio el "me gusta". Contiene los detalles del usuario que da la recomendación.
 *
 * @returns {void} No devuelve nada, pero crea una notificación en la base de datos.
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
