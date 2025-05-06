const express = require("express");
const router = express.Router();
const {createBoard, getBoards, deleteBoard, editBoard, likeBoard, comments} = require("../Controllers/BoardsController");
const authMiddleware = require('../Middleware/auth');

router.post("/boards", authMiddleware, createBoard);
router.get("/boards", authMiddleware, getBoards);
router.delete("/boards/:id", authMiddleware, deleteBoard);
router.put("/boards/:id", authMiddleware, editBoard);
router.put("/boards/likes/:id", authMiddleware, likeBoard);
router.put('/boards/comments/:id', authMiddleware, comments);

module.exports = router;