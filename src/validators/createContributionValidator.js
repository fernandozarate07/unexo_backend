const { body } = require("express-validator");

const contributionValidator = [
  body("title").notEmpty().withMessage("El título es obligatorio"),
  body("description").notEmpty().withMessage("La descripción es obligatoria"),
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
