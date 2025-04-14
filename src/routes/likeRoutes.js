const express = require("express");
const router = express.Router();

const checkSessionFlow = require("../middlewares/checkSessionFlow");
const checkExistingContribution = require("../middlewares/checkExistingContribution");
const likeContributionToggle = require("../controllers/like/likeContributionToggle");

router.post("/contributionToggle/:id", checkSessionFlow, checkExistingContribution, likeContributionToggle);

module.exports = router;
