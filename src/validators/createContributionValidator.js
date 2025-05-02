const { body } = require("express-validator");

const contributionValidator = [
  body("title")
    .optional()
    .isString()
    .withMessage("El título debe ser un texto")
    .isLength({ min: 15, max: 100 })
    .withMessage("El título debe tener entre 15 y 100 caracteres"),
  body("description")
    .optional()
    .isString()
    .withMessage("La descripción debe ser un texto")
    .isLength({ min: 15, max: 500 })
    .withMessage("La descripción no puede exceder los 500 caracteres"),
  body("linkDrive")
    .isURL()
    .withMessage("El link de Google Drive debe ser una URL válida")
    .matches(/drive\.google\.com/)
    .withMessage("El link debe ser de Google Drive"),
  body("typeId")
    .customSanitizer((value) => parseInt(value, 10))
    .isInt({ min: 1 })
    .withMessage("El tipo de publicación debe ser un número entero positivo"),
  body("facultyId")
    .customSanitizer((value) => parseInt(value, 10))
    .isInt({ min: 1 })
    .withMessage("El ID de la facultad debe ser un número positivo"),
  body("degreeId")
    .customSanitizer((value) => parseInt(value, 10))
    .isInt({ min: 1 })
    .withMessage("El ID de la carrera debe ser un número positivo"),
  body("yearId")
    .customSanitizer((value) => parseInt(value, 10))
    .isInt({ min: 1 })
    .withMessage("El ID del año académico debe ser un número positivo"),
  body("subjectId")
    .customSanitizer((value) => parseInt(value, 10))
    .isInt({ min: 1 })
    .withMessage("El ID de la asignatura debe ser un número positivo"),
];

module.exports = contributionValidator;
