const { body } = require("express-validator");

// Validaciones para el registro de usuario
const authValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre no puede estar vacío")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s]+$/)
    .withMessage("El nombre solo puede contener letras, números y espacios")
    .isLength({ min: 2, max: 40 })
    .withMessage("El nombre debe tener entre 2 y 40 caracteres"),
  body("email").isEmail().withMessage("El correo electrónico debe ser válido"),
  body("password").isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Debe confirmar la contraseña")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Las contraseñas no coinciden"),
];

module.exports = authValidator;
