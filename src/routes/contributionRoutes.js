// Importación de Express y creación del router
const express = require("express");
const router = express.Router();

// Middlewares personalizados
const checkIsPublicLink = require("../middlewares/checkIsPublicLink"); // Verifica si el enlace es público
const checkExistingLink = require("../middlewares/checkExistingLink"); // Verifica si el enlace ya fue utilizado
const checkSessionFlow = require("../middlewares/checkSessionFlow"); // Verifica que exista una sesión activa

// Controlador para manejar la creación de aportes
const createContribution = require("../controllers/contribution/createContribution"); // Controlador para crear un aporte
const updateContribution = require("../controllers/contribution/updateContribution"); // Controlador para actualizar un aporte
const deleteContribution = require("../controllers/contribution/deleteContribution"); // Controlador para eliminar un aporte
const recoverUserContributions = require("../controllers/contribution/recoverUserContribution"); // Controlador para recuperar aportes de un usuario

// Validador y middleware para validar los datos del aporte
const createContributionValidator = require("../validators/createContributionValidator"); // Esquema de validación
const updateContributionValidator = require("../validators/updateContributionValidator"); // Esquema de validación para actualización
const deleteContributionValidator = require("../validators/deleteContributionValidator"); // Esquema de validación para eliminación
const validateDataRequest = require("../middlewares/validateDataRequest"); // Middleware que maneja errores de validación

// Ruta para verificar si un link es público (utilizada de forma independiente)
router.post("/verify-link", checkIsPublicLink);

//-------------------------------------------------

// Ruta para crear un nuevo aporte
// Secuencia de middlewares:
// 1. Verifica sesión -> 2. Valida datos -> 3. Maneja errores de validación
// 4. Verifica duplicación de enlace -> 5. Crea el aporte
router.post(
  "/",
  checkSessionFlow,
  createContributionValidator,
  validateDataRequest,
  checkExistingLink,
  createContribution
);
//-------------------------------------------------

// Ruta para editar un aporte existente
// Secuencia de middlewares:
// 1. Verifica sesión -> 2. Valida datos  -> 3. Maneja errores de validación
// 4. Verifica duplicación de enlace -> 5. edita el aporte
router.put(
  "/:id",
  checkSessionFlow,
  updateContributionValidator,
  validateDataRequest,
  checkExistingLink,
  updateContribution
);
//-------------------------------------------------

// Ruta para borrar un aporte existente
// Secuencia de middlewares:
// 1. Verifica sesión -> 2. Valida datos  -> 3. Maneja errores de validación
// 4. Borra la contribucion y todas las relaciones asociadas de otras tablas a esa contribución
router.delete("/:id", checkSessionFlow, deleteContributionValidator, validateDataRequest, deleteContribution);

//-------------------------------------------------

// Ruta para recuperar los aportes de un usuario
// Secuencia de middlewares:
// 1. Verifica sesión -> 2. recupera los aportes del usuario
router.get("/my", checkSessionFlow, recoverUserContributions);

//-------------------------------------------------

// Exportación del router para ser utilizado en app.js u otro archivo principal
module.exports = router;
