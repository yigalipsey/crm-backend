import express from "express";
import { CreateUserService } from "../services/users/CreateUserService.js";
import { LoginService } from "../services/users/LoginService.js";
import { DeleteUserService } from "../services/users/DeleteUserService.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route for creating a new user
router.post("/create", authMiddleware, CreateUserService);
router.post("/login", LoginService);
router.delete("/:userId", authMiddleware, DeleteUserService);

export default router;
