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

// Rutas de autenticación
router.post("/register", authValidator, validateDataRequest, registerUser);
router.post("/login", loginUser);
router.post("/logout", checkSessionFlow, logoutUser);
router.get("/sessionStatus", sessionStatus);

// cambiar contraseña y recuperarla
router.put("/updatePassword", checkSessionFlow, updatePasswordValidator, validateDataRequest, updatePassword);
// router.post("/reset-forgot-password", resetForgotPassword);

module.exports = router;
