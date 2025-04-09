const prisma = require("../../config/prisma");

const recoverData = async (req, res) => {
  try {
    const [types, faculties, degrees, years, subjects] = await Promise.all([
      prisma.contributionType.findMany({ select: { id: true, name: true } }),
      prisma.faculty.findMany({ select: { id: true, name: true } }),
      prisma.degree.findMany({ select: { id: true, name: true, facultyId: true } }),
      prisma.academicYear.findMany({ select: { id: true, name: true, degreeId: true } }),
      prisma.subject.findMany({ select: { id: true, name: true, yearId: true } }),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        types,
        faculties,
        degrees,
        years,
        subjects,
      },
    });
  } catch (error) {
    console.error("(recoverData) Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error al recuperar datos para los filtros.",
    });
  }
};

module.exports = recoverData;
