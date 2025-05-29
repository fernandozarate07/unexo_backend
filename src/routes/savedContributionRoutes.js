// Importación de Express y creación del router
const express = require("express");
const router = express.Router();

// Middlewares personalizados
const checkSessionFlow = require("../middlewares/checkSessionFlow"); // Verifica que exista una sesión activa
const checkExistingContribution = require("../middlewares/checkExistingContribution"); // Verifica si existe el aporte en base de datos
const checkIsUser = require("../middlewares/checkIsUser");

// Controlador para manejar la creación de aportes
const recoverUserSavedContributions = require("../controllers/savedContribution/recoverUserSavedContribution"); // Controlador para recuperar los aporte guardados del usuario
const savedContributionToggle = require("../controllers/savedContribution/savedContributionToggle"); //controlador para agregar o quitar de aportes guardados
const recoverSavedStateContribution = require("../controllers/savedContribution/recoverSavedStateContribution"); //controlador para recuperar el estado de si esta o no guardado el aporte

//-------------------------------------------------

// Ruta para recuperar los aportes de un usuario
// Secuencia de middlewares:
// 1. Verifica sesión -> 2. Verifica si existe una aporte -> 3. controlador que envia el estado de si el aporte se encuentra o no guardado
router.get("/:id", checkSessionFlow, checkIsUser, checkExistingContribution, recoverSavedStateContribution);
//-------------------------------------------------

// Ruta para recuperar los aportes de un usuario
// Secuencia de middlewares:
// 1. Verifica sesión -> 2. Verifica si existe una aporte -> 3. controlador para agregar o quitar de aportes guardados
router.post("/:id/toggle", checkSessionFlow, checkIsUser, checkExistingContribution, savedContributionToggle);
//-------------------------------------------------

// Ruta para recuperar los aportes de un usuario
// Secuencia de middlewares:
// 1. Verifica sesión -> 2. recupera los aportes guardados del usuario
router.get("/", checkSessionFlow, checkIsUser, recoverUserSavedContributions);
// Exportación del router para ser utilizado en app.js u otro archivo principal
module.exports = router;
