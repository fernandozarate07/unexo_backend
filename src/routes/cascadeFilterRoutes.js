const express = require("express");
const router = express.Router();

const cascadeFilter = require("../controllers/cascadeFilter/cascadeFilter");

router.get("/cascadeFilter", cascadeFilter);

module.exports = router;
