const express = require("express");
const router = express.Router();

const notificationsStatus = require("../controllers/notification/notificationsStatus");
const checkSessionFlow = require("../middlewares/checkSessionFlow");
const markAsRead = require("../controllers/notification/markAsRead");

router.get("/notificationsStatus", checkSessionFlow, notificationsStatus);
router.patch("/markAsRead/:id", checkSessionFlow, markAsRead);
module.exports = router;
