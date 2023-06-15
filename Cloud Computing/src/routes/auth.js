const express = require("express");
const controllerUser = require("../controller/user");
const router = express.Router();


router.post("/", controllerUser.loginUser);

module.exports = router;