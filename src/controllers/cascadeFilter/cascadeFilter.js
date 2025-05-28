const prisma = require("../../config/prisma");

/**
 * Controlador para filtrar los aportes (contributions) según los parámetros proporcionados en la consulta.
 * Los filtros pueden incluir tipo, facultad, carrera, año académico y asignatura.
 *
 * @param {Object} req - El objeto de la solicitud HTTP que contiene los parámetros de la consulta (query parameters) utilizados para filtrar los aportes.
 * @param {Object} res - El objeto de la respuesta HTTP que se utilizará para enviar la respuesta al cliente con los resultados de la búsqueda.
 *
 * @returns {Object} Respuesta HTTP con un mensaje de éxito y los resultados de la búsqueda, o un mensaje de error en caso de fallar la consulta.
 * @throws {Object} Respuesta HTTP con un mensaje de error 500 si ocurre algún problema al realizar la consulta.
 */
const filterContent = async (req, res) => {
  try {
    // Extraemos los filtros de los parámetros de la query
    const { type, faculty, degree, academicYear, subject } = req.query;

    // Filtros base para asegurar que solo se busquen aportes activos
    const filters = {
      isActive: true, // Solo aportes activos
    };

    // Agregar los filtros opcionales si se proporcionan en la query
    if (type) filters.typeId = parseInt(type); // Filtrar por tipo de aporte
    if (faculty) filters.facultyId = parseInt(faculty); // Filtrar por facultad
    if (degree) filters.degreeId = parseInt(degree); // Filtrar por carrera
    if (academicYear) filters.yearId = parseInt(academicYear); // Filtrar por año académico
    if (subject) filters.subjectId = parseInt(subject); // Filtrar por asignatura

    // Realizamos la consulta a la base de datos utilizando Prisma
    const result = await prisma.contribution.findMany({
      where: filters, // Aplicar los filtros definidos
      include: {
        type: true, // Incluir información sobre el tipo de aporte
        faculty: true, // Incluir información sobre la facultad
        degree: true, // Incluir información sobre la carrera
        academicYear: true, // Incluir información sobre el año académico
        subject: true, // Incluir información sobre la asignatura
        user: {
          // Incluir información básica del usuario que realizó el aporte
          select: {
            id: true, // ID del usuario
            name: true, // Nombre del usuario
            profilePhoto: true, // Foto de perfil del usuario
          },
        },
      },
      orderBy: {
        createdAt: "desc", // Ordenar los resultados por la fecha de creación en orden descendente
      },
    });

    // Enviar la respuesta con los resultados de la búsqueda
    return res.status(200).json({
      success: true,
      data: {
        count: result.length, // Número total de resultados encontrados
        result, // Los datos de los aportes encontrados
      },
    });
  } catch (error) {
    // Si ocurre un error durante la consulta, lo capturamos y respondemos con un mensaje de error
    return res.status(500).json({
      success: false,
      message: "ERROR: Error al filtrar contenido.",
    });
  }
};

module.exports = filterContent;
