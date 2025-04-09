const express = require("express");
const router = express.Router();

const cascadeFilter = require("../controllers/cascadeFilter/cascadeFilter");
const recoverData = require("../controllers/cascadeFilter/recoverData");

router.get("/cascadeFilter", cascadeFilter);
router.get("/recoverData", recoverData);

module.exports = router;
