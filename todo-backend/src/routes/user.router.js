var express = require("express");
var router = express.Router();
const controller = require("../app/controllers/user.controller");

router.post("/register", controller.register);
router.post("/authenticate", controller.authenticate);

module.exports = router;
