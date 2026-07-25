const express = require('express')

const router = express.Router()

const authController = require("../controllers/authController")

const isAuthenticated = require("../middleware/auth");

router.post("/logout", isAuthenticated, authController.logout);
router.get("/me",isAuthenticated,authController.me)
router.post("/login",authController.login);
router.post("/register",authController.register)
module.exports=router;