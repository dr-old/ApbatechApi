var express = require("express");
var UserController = require("../controllers/users");
var uploadFilter = require("../middleware/multer");
var router = express.Router();

router.get("/", UserController.getAll);

router.get("/:id", UserController.getById);

router.post("/", UserController.create);

router.put("/:id", UserController.update);

router.delete("/:id", UserController.delete);

module.exports = router;
