// Importación de Express y creación del router
const express = require("express");
const router = express.Router();

// Middlewares personalizados
const checkIsPublicLink = require("../middlewares/checkIsPublicLink"); // Verifica si el enlace es público
const checkExistingLink = require("../middlewares/checkExistingLink"); // Verifica si el enlace ya fue utilizado
const checkSessionFlow = require("../middlewares/checkSessionFlow"); // Verifica que exista una sesión activa

// Controlador para manejar la creación de aportes
const createContribution = require("../controllers/contribution/createContribution");

// Validador y middleware para validar los datos del aporte
const createContributionValidator = require("../validators/createContributionValidator"); // Esquema de validación
const validateDataRequest = require("../middlewares/validateDataRequest"); // Middleware que maneja errores de validación

// Ruta para verificar si un link es público (utilizada de forma independiente)
router.post("/checkIsPublicLink", checkIsPublicLink);

// Ruta para crear un nuevo aporte
// Secuencia de middlewares:
// 1. Verifica sesión -> 2. Valida datos con esquema -> 3. Maneja errores de validación
// 4. Verifica duplicación de enlace -> 5. Crea el aporte
router.post(
  "/create",
  checkSessionFlow,
  createContributionValidator,
  validateDataRequest,
  checkExistingLink,
  createContribution
);

// Exportación del router para ser utilizado en app.js u otro archivo principal
module.exports = router;
