const express = require("express");
const router = express.Router();

// Auth require
// const { forgotPassword, resetForgotPassword } = require("../controller/auth/forgotPassword");
const { logoutUser, loginUser } = require("../controllers/auth/loginLogoutUser");
const registerUser = require("../controllers/auth/registerUser");
const sessionStatus = require("../controllers/auth/sessionStatus");

// Validator require
const authValidator = require("../validators/authValidator");

// Middleware require
const validateDataRequest = require("../middlewares/validateDataRequest");
const checkSessionFlow = require("../middlewares/checkSessionFlow");

// Rutas de autenticación
router.post("/register", authValidator, validateDataRequest, registerUser);
router.post("/login", loginUser);
router.post("/logout", checkSessionFlow, logoutUser);
router.get("/sessionStatus", sessionStatus);
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-forgot-password", resetForgotPassword);

module.exports = router;
