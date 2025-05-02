const { body } = require("express-validator");

/**
 * Middleware de validación para actualizar el nombre del usuario.
 * Verifica que el campo 'name' no esté vacío, contenga letras, números y espacios,
 * y tenga una longitud adecuada.
 */
const updateNameValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre no puede estar vacío")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s]+$/)
    .withMessage("El nombre solo puede contener letras, números y espacios")
    .isLength({ min: 2, max: 40 })
    .withMessage("El nombre debe tener entre 2 y 40 caracteres"),
];

module.exports = updateNameValidator;
