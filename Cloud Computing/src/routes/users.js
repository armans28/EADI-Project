const express = require("express");
const controllerUser = require("../controller/user");
const router = express.Router();

// untuk sign up
router.post("/", controllerUser.signUp);


router.get('/', controllerUser.getAllDataUser);

router.get('/:id', controllerUser.getDataUser);

//untuk update data di edit profile
router.patch("/:id", controllerUser.updateDataUser);

router.delete("/:id", controllerUser.deleteDataUser);

module.exports = router;
