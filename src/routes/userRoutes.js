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

// validadores
const imageValidator = require("../validators/imageValidator");
const updateNameValidator = require("../validators/updateNameValidator");

// RUTAS ------------------------------------------------------------

// Subir o actualizar foto de perfil
router.put(
  "/handleProfilePicture",
  checkSessionFlow,
  cloudinaryImageUploader,
  imageValidator,
  validateImageRequest,
  handleProfilePhoto
);

// editar o cambiar nombre
router.put("/updateName", checkSessionFlow, updateNameValidator, validateDataRequest, updateName);

module.exports = router;
