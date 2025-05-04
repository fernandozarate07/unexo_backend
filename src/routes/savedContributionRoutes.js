// Importación de Express y creación del router
const express = require("express");
const router = express.Router();

// Middlewares personalizados
const checkSessionFlow = require("../middlewares/checkSessionFlow"); // Verifica que exista una sesión activa
const checkExistingContribution = require("../middlewares/checkExistingContribution"); // Verifica si existe el aporte en base de datos

// Controlador para manejar la creación de aportes
const recoverUserSavedContributions = require("../controllers/savedContribution/recoverUserSavedContribution"); // Controlador para recuperar los aporte guardados del usuario
const savedContributionToggle = require("../controllers/savedContribution/savedContributionToggle"); //controlador para agregar o quitar de aportes guardados

// Ruta para recuperar los aportes de un usuario
// Secuencia de middlewares:
// 1. Verifica sesión -> 2. Verifica si existe una aporte -> 3. controlador para agregar o quitar de aportes guardados
router.post("/savedContributionToggle/:id", checkSessionFlow, checkExistingContribution, savedContributionToggle);
// Exportación del router para ser utilizado en app.js u otro archivo principal

//-------------------------------------------------

// Ruta para recuperar los aportes de un usuario
// Secuencia de middlewares:
// 1. Verifica sesión -> 2. recupera los aportes guardados del usuario
router.get("/recoverUserSavedContributions", checkSessionFlow, recoverUserSavedContributions);

// Exportación del router para ser utilizado en app.js u otro archivo principal
module.exports = router;
