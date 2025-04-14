const prisma = require("../config/prisma");

const checkExistingContribution = async (req, res, next) => {
  const { id: contributionId } = req.params;

  try {
    const contribution = await prisma.contribution.findUnique({
      where: { id: parseInt(contributionId) },
    });

    if (!contribution) {
      return res.status(404).json({ message: "Aporte no encontrado" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "ERROR: Se produjo un error interno del servidor" });
  }
};

module.exports = checkExistingContribution;
