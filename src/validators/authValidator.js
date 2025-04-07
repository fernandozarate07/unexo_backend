const { body } = require("express-validator");

// Validaciones para el registro de usuario
const authValidator = [
  body("name").notEmpty().withMessage("El nombre es obligatorio"),
  body("email").isEmail().withMessage("El correo electrónico debe ser válido"),
  body("phone")
    .notEmpty()
    .withMessage("El teléfono es obligatorio")
    .matches(/^\d{10}$/)
    .withMessage("El teléfono debe tener exactamente 10 dígitos"),
  body("password").isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Debe confirmar la contraseña")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Las contraseñas no coinciden"),
];

module.exports = authValidator;
