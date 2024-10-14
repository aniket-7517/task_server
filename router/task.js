const express = require("express");
const router = express.Router();
const taskController = require("../controller/task");
const validator = require("../middleware/validator");

router.get("/", validator, taskController.getTasks);
router.post("/", validator, taskController.createTask);
router.get("/:id", validator, taskController.getTask);
router.put("/:id", validator, taskController.updateTask);
router.delete("/:id", validator, taskController.deleteTask);

module.exports = router;
