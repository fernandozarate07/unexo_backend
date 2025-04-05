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
// const checkIsAdmin = require("../middlewares/checkIsAdmin");

//--------------------------------------------------
// Routes

// Data reset routes
router.post("/resetDynamicData", resetDynamicData);
router.post("/resetStaticData", resetStaticData);

// Role management
// router.post("/updateRole", checkIsAdmin, updateRoleValidator, validateDataRequest, updateRole);

//--------------------------------------------------
// 🟡 AVISO IMPORTANTE:
// Cuando pases a producción, cambiá `checkIsAdmin` por `verifyAdmin`
// en las rutas que lo requieran. Notificado 😉
//--------------------------------------------------

module.exports = router;
