const express = require("express");
const router = express.Router();

const checkSessionFlow = require("../middlewares/checkSessionFlow");
const checkExistingContribution = require("../middlewares/checkExistingContribution");
const likeContributionToggle = require("../controllers/like/likeContributionToggle");
const recoverLikeState = require("../controllers/like/recoverLikeState");
const checkIsUser = require("../middlewares/checkIsUser");

// Obtener estado del like de una contribución
router.get("/:id", checkSessionFlow, checkIsUser, checkExistingContribution, recoverLikeState);
// Alternar like para una contribución
router.post("/:id/toggle", checkSessionFlow, checkIsUser, checkExistingContribution, likeContributionToggle);

module.exports = router;
