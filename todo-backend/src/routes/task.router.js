var express = require("express");
var router = express.Router();
const controller = require("../app/controllers/task.controller");
const authMiddleware = require("../app/middlewares/auth.middle");

router.use(authMiddleware);

router.get("/", controller.get);
router.post("/", controller.post);
router.get("/:id", controller.getById);
router.patch("/:id", controller.patch);
router.delete("/:id", controller.delete);

module.exports = router;
