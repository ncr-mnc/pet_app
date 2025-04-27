const express = require("express");
const router = express.Router();
const {signUp, signIn, getUser} = require("../Controllers/AuthController");
const authMiddleware = require('../Middleware/auth');

router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.get("/getUser/:id", getUser);

module.exports = router;