var express = require("express");
const controller = require("../app/controllers/project.controller");
const authMiddleware = require("../app/middlewares/auth.middle");

var router = express.Router();

router.use(authMiddleware);

router.get("/", controller.get);
router.post("/", controller.post);
router.get("/:id", controller.getById);
router.patch("/:id", controller.patch);
router.delete("/:id", controller.delete);

module.exports = router;
