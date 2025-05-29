const express = require("express");
const router = express.Router();

//--------------------------------------------------
// Controllers

// Data
const { resetDynamicData, resetStaticData } = require("../controllers/admin/data/resetData");

// Other
// const updateRole = require("../controller/admin/other/updateRole");
// const updateRoleValidator = require("../validator/updateRoleValidator");

//--------------------------------------------------
// Middlewares

// const validateDataRequest = require("../middlewares/validateDataRequest");
const checkIsSuperAdmin = require("../middlewares/checkIsSuperAdmin");
const checkSessionFlow = require("../middlewares/checkSessionFlow");

//--------------------------------------------------
// Routes

// Data reset routes
router.post("/reset/dynamic", checkSessionFlow, checkIsSuperAdmin, resetDynamicData);
router.post("/reset/static", checkSessionFlow, checkIsSuperAdmin, resetStaticData);

// Role management
// router.post("/updateRole", checkIsAdmin, updateRoleValidator, validateDataRequest, updateRole);

//--------------------------------------------------
// 🟡 AVISO IMPORTANTE:
// Cuando pases a producción, cambiá `checkIsAdmin` por `verifyAdmin`
// en las rutas que lo requieran. Notificado 😉
//--------------------------------------------------

module.exports = router;
