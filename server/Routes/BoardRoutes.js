const express = require("express");
const router = express.Router();
const {createBoard, getBoards, deleteBoard, editBoard} = require("../Controllers/BoardsController");
const authMiddleware = require('../Middleware/auth');

router.post("/boards", authMiddleware, createBoard);
router.get("/boards", authMiddleware, getBoards);
router.delete("/boards/:id", authMiddleware, deleteBoard);
router.put("/boards/:id", authMiddleware, editBoard);

module.exports = router;