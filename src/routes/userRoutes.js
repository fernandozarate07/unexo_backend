const express = require("express");
const router = express.Router();

// controladores
const updateName = require("../controllers/user/data/updateName");

// subir y editar foto
const cloudinaryImageUploader = require("../middlewares/cloudinaryImageUploader");
const handleProfilePhoto = require("../controllers/user/uploadProfilePhoto/handleProfilePhoto");

// middlewares
const checkSessionFlow = require("../middlewares/checkSessionFlow");
const validateImageRequest = require("../middlewares/validateImageRequest");
const validateDataRequest = require("../middlewares/validateDataRequest");
const checkIsUser = require("../middlewares/checkIsUser");

// validadores
const imageValidator = require("../validators/imageValidator");
const updateNameValidator = require("../validators/updateNameValidator");

// RUTAS ------------------------------------------------------------

// Actualizar foto de perfil
router.put(
  "/profile-picture",
  checkSessionFlow,
  checkIsUser,
  cloudinaryImageUploader,
  imageValidator,
  validateImageRequest,
  handleProfilePhoto
);
// Actualizar nombre
router.put("/name", checkSessionFlow, checkIsUser, updateNameValidator, validateDataRequest, updateName);
module.exports = router;
