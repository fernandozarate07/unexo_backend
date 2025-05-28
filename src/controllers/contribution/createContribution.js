// Importa la configuración de Prisma
const prisma = require("../../config/prisma");

/**
 * Controlador para crear un nuevo aporte.
 * Este controlador maneja la creación de un aporte en la base de datos utilizando los datos enviados en la solicitud.
 *
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 *
 * @returns {Object} - Respuesta HTTP:
 *  - 201: Si el aporte se crea correctamente, se responde con el nuevo aporte.
 *  - 500: Si ocurre un error al intentar crear el aporte, se responde con un error.
 */
const createContribution = async (req, res) => {
  try {
    // Desestructuración de los datos enviados en la solicitud
    const { title, description, typeId, facultyId, degreeId, yearId, subjectId, linkDrive } = req.body;
    const userId = req.user.id; // Obtener el ID del usuario desde la sesión o el token

    // Crear el nuevo aporte en la base de datos usando Prisma
    const newContribution = await prisma.contribution.create({
      data: {
        title: title, // Título del aporte
        userId: userId, // ID del usuario que realiza el aporte
        description: description, // Descripción del aporte
        typeId: typeId, // Tipo del aporte (referencia a la tabla correspondiente)
        facultyId: facultyId, // Facultad asociada al aporte
        degreeId: degreeId, // Carrera asociada al aporte
        yearId: yearId, // Año de la asignatura asociada al aporte
        subjectId: subjectId, // Asignatura asociada al aporte
        url: linkDrive, // Enlace de Google Drive para el aporte
      },
    });

    // Si la creación es exitosa, respondemos con el nuevo aporte creado
    return res.status(201).json({
      message: "SUCCESS: Aporte creado con éxito", // Mensaje de éxito
      aporte: newContribution, // El aporte recién creado
    });
  } catch (error) {
    // En caso de error, lo capturamos y respondemos con un error 500
    return res.status(500).json({ message: "ERROR: Error al crear el aporte" });
  }
};

// Exporta la función del controlador para ser utilizada en otras partes de la aplicación
module.exports = createContribution;
