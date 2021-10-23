const express = require('express');
const router = express.Router();

const cleanBody = require('../middlewares/cleanbody');
const { validateToken } = require("../middlewares/validateToken");

const AuthController = require("../controllers/user.controller");


//Define user registration endpoint
router.post("/signup", cleanBody, AuthController.Signup);

// Define user activation endpoint
router.patch("/activate", cleanBody, AuthController.Activate);

//Define user Login endpoint
router.post("/login", cleanBody, AuthController.Login)

// define forgot password endpoint
router.patch("/forgot", cleanBody, AuthController.ForgotPassword);

// Define reset password endpoint
router.patch("/reset", cleanBody, AuthController.ResetPassword);

// Define refered token endpoint
router.get("/referred", validateToken,AuthController.ReferredAccounts);

// Define Logout Endpoint
router.get("/logout", validateToken, AuthController.Logout);

module.exports = router;