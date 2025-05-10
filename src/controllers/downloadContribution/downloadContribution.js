const prisma = require("../../config/prisma");
const updateNexoPoints = require("../../services/updateNexoPoints");

const downloadContribution = async (req, res) => {
  const DOWNLOAD_COST = 5;
  const AUTHOR_REWARD = 5;

  const userId = req.user.id;
  const contributionId = parseInt(req.params.id);

  try {
    // 1. Verificamos si ya descargó esta contribución
    const existingDownload = await prisma.downloadContribution.findFirst({
      where: {
        userId,
        contributionId,
      },
    });

    if (existingDownload) {
      return res.status(400).json({
        success: false,
        message: "ERROR: Ya descargaste este aporte.",
      });
    }

    // 2. Obtenemos la contribución para saber quién es el autor y su URL
    const contribution = await prisma.contribution.findUnique({
      where: { id: contributionId },
      select: {
        userId: true, // autor del aporte
        url: true, // URL de la contribución
      },
    });

    if (!contribution) {
      return res.status(404).json({
        success: false,
        message: "ERROR: Aporte no encontrado.",
      });
    }

    // VALIDACIÓN NUEVA: no permitir que el autor descargue su propio aporte
    if (contribution.userId === userId) {
      return res.status(400).json({
        success: false,
        message: "ERROR: No puedes descargar tu propio aporte.",
      });
    }

    // 3. Creamos el registro de descarga
    await prisma.downloadContribution.create({
      data: {
        userId,
        contributionId,
      },
    });

    // 4. Actualizamos nexopoints
    await updateNexoPoints({
      userId,
      amount: DOWNLOAD_COST,
      operation: "sub",
    });

    await updateNexoPoints({
      userId: contribution.userId,
      amount: AUTHOR_REWARD,
      operation: "add",
    });

    // 5. Respondemos con éxito y la URL
    return res.status(200).json({
      success: true,
      message: "SUCCESS: Descarga registrada con éxito.",
      downloadUrl: contribution.url,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "ERROR: Error interno del servidor.",
    });
  }
};

module.exports = downloadContribution;
