const express = require("express");
const router = express.Router();

const cascadeFilter = require("../controllers/cascadeFilter/cascadeFilter");
const recoverData = require("../controllers/cascadeFilter/recoverData");

router.get("/options", cascadeFilter);
router.get("/prefill", recoverData);

module.exports = router;
