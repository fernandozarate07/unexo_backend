const { body } = require("express-validator");

// Validador para el cambio de contraseña
const validateChangePassword = [
  body("currentPassword").notEmpty().withMessage("La contraseña actual es obligatoria"),
  body("newPassword").isLength({ min: 6 }).withMessage("La nueva contraseña debe tener al menos 6 caracteres"),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Debe confirmar la nueva contraseña")
    .custom((value, { req }) => value === req.body.newPassword)
    .withMessage("Las contraseñas no coinciden"),
];

module.exports = validateChangePassword;
