const express = require("express");
const userController = require("../controllers/user");
const workoutController = require("../controllers/workout");


const { verify, isLoggedIn } = require('../auth.js');

const router = express.Router();

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

router.get("/details", verify, userController.getUserDetails);

module.exports = router;