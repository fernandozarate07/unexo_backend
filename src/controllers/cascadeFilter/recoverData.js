const prisma = require("../../config/prisma");

/**
 * Controlador para recuperar los datos necesarios para los filtros.
 * Se obtienen los tipos de aporte, facultades, carreras, años académicos y asignaturas.
 *
 * @param {Object} req - El objeto de la solicitud HTTP que no requiere parámetros específicos para esta función.
 * @param {Object} res - El objeto de la respuesta HTTP que se utiliza para enviar los datos necesarios para los filtros.
 *
 * @returns {Object} Respuesta HTTP con los datos necesarios para los filtros (tipos de aporte, facultades, carreras, años académicos y asignaturas).
 * @throws {Object} Respuesta HTTP con un mensaje de error 500 si ocurre algún problema al realizar la consulta.
 */
const recoverData = async (req, res) => {
  try {
    // Realizamos múltiples consultas a la base de datos en paralelo utilizando Promise.all
    const [types, faculties, degrees, years, subjects] = await Promise.all([
      // Obtener todos los tipos de aporte (contribution types)
      prisma.contributionType.findMany({ select: { id: true, name: true } }),
      // Obtener todas las facultades (faculties)
      prisma.faculty.findMany({ select: { id: true, name: true } }),
      // Obtener todas las carreras (degrees), incluyendo el id de la facultad asociada
      prisma.degree.findMany({ select: { id: true, name: true, facultyId: true } }),
      // Obtener todos los años académicos (academic years), incluyendo el id de la carrera asociada
      prisma.academicYear.findMany({ select: { id: true, name: true, degreeId: true } }),
      // Obtener todas las asignaturas (subjects), incluyendo el id del año académico asociado
      prisma.subject.findMany({ select: { id: true, name: true, yearId: true } }),
    ]);

    // Devolvemos una respuesta exitosa con los datos recuperados
    return res.status(200).json({
      success: true,
      data: {
        types, // Tipos de aporte
        faculties, // Facultades
        degrees, // Carreras
        years, // Años académicos
        subjects, // Asignaturas
      },
    });
  } catch (error) {
    // Si ocurre un error al recuperar los datos, lo capturamos y enviamos un mensaje de error
    console.error("(recoverData) Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error al recuperar datos para los filtros.",
    });
  }
};

module.exports = recoverData;
