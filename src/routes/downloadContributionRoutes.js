// Importación de Express y creación del router
const express = require("express");
const router = express.Router();

// Middlewares personalizados
const checkSessionFlow = require("../middlewares/checkSessionFlow"); // Verifica que exista una sesión activa
const checkExistingContribution = require("../middlewares/checkExistingContribution"); // Verifica si existe el aporte en base de datos

// Controlador para manejar la creación de aportes
const recoverDownloadContributions = require("../controllers/downloadContribution/recoverDownloadContribution"); // Controlador para recuperar las descargas de aportes del usaurio.
const downloadContribution = require("../controllers/downloadContribution/downloadContribution"); //controlador para generar una descarga

// Ruta para descargar un aporte.

// Secuencia de middlewares:
// 1. Verifica sesión -> 2. Verifica si existe una aporte -> 3. controlador que crea la descarga.
router.post("/create/:id", checkSessionFlow, checkExistingContribution, downloadContribution);
// Exportación del router para ser utilizado en app.js u otro archivo principal

//-------------------------------------------------

// Ruta para recuperar las descargas de aportes de un usuario.

// Secuencia de middlewares:
// 1. Verifica sesión -> 2. recupera los aportes guardados del usuario -> 3.recupera las contribuciones descargadas por el usuario.
router.get("/recover", checkSessionFlow, recoverDownloadContributions);

// Exportación del router para ser utilizado en app.js u otro archivo principal
module.exports = router;
