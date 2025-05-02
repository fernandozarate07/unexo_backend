const { param } = require("express-validator");

const deleteContributionValidator = [
  param("id")
    .notEmpty()
    .withMessage("El parámetro 'id' es requerido")
    .bail()
    .isInt({ gt: 0 })
    .withMessage("El parámetro 'id' debe ser un número entero positivo"),
];
module.exports = deleteContributionValidator;
