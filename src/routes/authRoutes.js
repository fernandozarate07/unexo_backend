const express = require("express");
const router = express.Router();

// Auth require
// const { forgotPassword, resetForgotPassword } = require("../controller/auth/forgotPassword");
const { logoutUser, loginUser } = require("../controllers/auth/loginLogoutUser");
const registerUser = require("../controllers/auth/registerUser");

// Validator require
const authValidator = require("../validators/authValidator");

// Service require
const validateDataRequest = require("../middlewares/validateDataRequest");
const { checkSessionFlow, checkSessionStatus } = require("../middlewares/checkSession");

// Rutas de autenticación
router.post("/register", authValidator, validateDataRequest, registerUser);
router.post("/login", loginUser);
router.post("/logout", checkSessionFlow, logoutUser);
router.get("/checkSessionStatus", checkSessionStatus);
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-forgot-password", resetForgotPassword);

module.exports = router;
