const { body } = require("express-validator");

const updateContributionValidator = [
  // Validación para el título (opcional pero si está presente, debe ser string y tener entre 3 y 100 caracteres)
  body("title")
    .optional()
    .isString()
    .withMessage("El título debe ser un texto")
    .isLength({ min: 15, max: 100 })
    .withMessage("El título debe tener entre 15 y 100 caracteres"),

  // Validación para la descripción (opcional, string y máximo 500 caracteres)
  body("description")
    .optional()
    .isString()
    .withMessage("La descripción debe ser un texto")
    .isLength({ min: 15, max: 500 })
    .withMessage("La descripción no puede exceder los 500 caracteres"),

  body("isActive").optional().isBoolean().withMessage("isActive debe ser un valor booleano (true/false)"), // Mensaje claro
  // Validación para isActive (opcional, debe ser booleano)

  // Validación para el link de Drive (opcional, pero si está presente debe ser una URL válida)
  body("linkDrive")
    .isURL()
    .withMessage("El link de Google Drive debe ser una URL válida")
    .matches(/drive\.google\.com/)
    .withMessage("El link debe ser de Google Drive"),
  // Validación para el contributionId (obligatorio y debe ser un número)
  body("contributionId")
    .notEmpty()
    .withMessage("El ID del aporte es obligatorio")
    .isInt()
    .withMessage("El ID del aporte debe ser un número entero"),
];

module.exports = updateContributionValidator;
