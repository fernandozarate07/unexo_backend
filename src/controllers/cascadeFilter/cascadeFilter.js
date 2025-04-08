const prisma = require("../../config/prisma");

const filterContent = async (req, res) => {
  try {
    const { type, faculty, degree, academicYear, subject } = req.query;

    const filters = {
      isActive: true,
    };

    if (type) filters.typeId = parseInt(type);
    if (faculty) filters.facultyId = parseInt(faculty);
    if (degree) filters.degreeId = parseInt(degree);
    if (academicYear) filters.yearId = parseInt(academicYear); // corregido acá
    if (subject) filters.subjectId = parseInt(subject);

    const result = await prisma.contribution.findMany({
      where: filters,
      include: {
        type: true,
        faculty: true,
        degree: true,
        academicYear: true,
        subject: true,
        user: {
          select: {
            id: true,
            name: true,
            profilePhoto: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      data: {
        count: result.length,
        result,
      },
    });
  } catch (error) {
    console.error("(filterContent) -> Error al filtrar contenido:", error);
    return res.status(500).json({
      success: false,
      message: "Error al filtrar contenido.",
    });
  }
};

module.exports = filterContent;
