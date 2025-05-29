const express = require("express");
const router = express.Router();

// Auth require
// const { forgotPassword, resetForgotPassword } = require("../controller/auth/forgotPassword");
const { logoutUser, loginUser } = require("../controllers/auth/loginLogoutUser");
const registerUser = require("../controllers/auth/registerUser");
const sessionStatus = require("../controllers/auth/sessionStatus");
const updatePassword = require("../controllers/auth/updatePassword");

// Validator require
const authValidator = require("../validators/authValidator");
const updatePasswordValidator = require("../validators/updatePasswordValidator");

// Middleware require
const validateDataRequest = require("../middlewares/validateDataRequest");
const checkSessionFlow = require("../middlewares/checkSessionFlow");
const checkIsUser = require("../middlewares/checkIsUser");

// Rutas de autenticación
router.post("/register", authValidator, validateDataRequest, registerUser);
router.post("/login", loginUser); // agregar validator para evitar ataques de fuerza bruta ni inyecciones SQL
router.post("/logout", checkSessionFlow, checkIsUser, logoutUser);
router.get("/session", checkSessionFlow, checkIsUser, sessionStatus);
router.put("/password", checkSessionFlow, checkIsUser, updatePasswordValidator, validateDataRequest, updatePassword);

// router.post("/reset-forgot-password", resetForgotPassword);

module.exports = router;
