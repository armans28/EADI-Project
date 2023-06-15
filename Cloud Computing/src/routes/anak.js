const express = require("express");
const controllerUser = require("../controller/user");
const router = express.Router();

router.post("/", controllerUser.sendDataAnak);
router.get("/", controllerUser.getAllDataAnak);
router.get("/:id", controllerUser.getDataAnak);
router.patch("/:id", controllerUser.updateDataAnak);
router.delete("/:id", controllerUser.deleteDataAnak);

module.exports = router;