const express = require("express");
const router = express.Router();

const checkSessionFlow = require("../middlewares/checkSessionFlow");
const checkExistingContribution = require("../middlewares/checkExistingContribution");
const likeContributionToggle = require("../controllers/like/likeContributionToggle");
const recoverLikeState = require("../controllers/like/recoverLikeState");

router.get("/recoverLikeState/:id", checkSessionFlow, checkExistingContribution, recoverLikeState);
router.post("/likeToggle/:id", checkSessionFlow, checkExistingContribution, likeContributionToggle);

module.exports = router;
