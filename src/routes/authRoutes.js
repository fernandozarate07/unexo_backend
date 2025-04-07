const express = require("express");
const router = express.Router();

// Auth require
// const { forgotPassword, resetForgotPassword } = require("../controller/auth/forgotPassword");
// const { logoutUser, loginUser } = require("../controller/auth/loginLogoutUser");
const registerUser = require("../controllers/auth/registerUser");

// Validator require
const authValidator = require("../validators/authValidator");

// Service require
const validateDataRequest = require("../middlewares/validateDataRequest");
// const { checkSession } = require("../service/checkSession");

// Rutas de autenticación
router.post("/register", authValidator, validateDataRequest, registerUser);
// router.post("/login", loginUser);
// router.post("/logout", checkSession, logoutUser);
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-forgot-password", resetForgotPassword);

module.exports = router;
