const express = require('express');
const authController = require("../controllers/auth.controller");
const isAuth = require('../middleware/isAuth');

const router = express.Router();

router.get("/", isAuth, authController.users)
router.get("/:id", isAuth, authController.user)
router.post("/add", isAuth, authController.addUser)
router.post("/login", authController.loginUser)
router.patch("/update/:id", isAuth, authController.updateUser)
router.patch("/update/password/:id", isAuth, authController.updatePassword)
router.patch("/update/profile/:id", isAuth, authController.updateProfilePic)
router.delete("/delete/:id", isAuth, authController.deleteUser)

module.exports = router