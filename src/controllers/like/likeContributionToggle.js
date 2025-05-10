const prisma = require("../../config/prisma");

const likeToggle = async (req, res) => {
  const userId = req.user.id;
  const contributionId = parseInt(req.params.id);

  try {
    //busca si existe like
    const existingLike = await prisma.likeContribution.findUnique({
      where: {
        userId_contributionId: {
          userId,
          contributionId,
        },
      },
    });
    //Si existe lo borra

    if (existingLike) {
      await prisma.likeContribution.delete({
        where: {
          userId_contributionId: {
            userId,
            contributionId,
          },
        },
      });
      //si no existe lo crea
    } else {
      await prisma.likeContribution.create({
        data: {
          userId,
          contributionId,
        },
      });
    }

    // Recalcular likesCount
    const totalLikes = await prisma.likeContribution.count({
      where: { contributionId },
    });

    await prisma.contribution.update({
      where: { id: contributionId },
      data: { likesCount: totalLikes },
    });

    return res.status(existingLike ? 200 : 201).json({
      success: true,
      message: existingLike
        ? "SUCCESS: El like fue quitado y el contador actualizado."
        : "SUCCESS: El like fue agregado y el contador actualizado.",
    });
  } catch (error) {
    console.error("Error en likeToggle:", error);
    return res.status(500).json({
      success: false,
      message: "ERROR: Se produjo un error interno del servidor",
    });
  }
};

module.exports = likeToggle;
