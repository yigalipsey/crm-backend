import express from "express";
import { RegisterService } from "../services/users/RegisterService.js";
import { LoginService } from "../services/users/LoginService.js";

const router = express.Router();

// Route for creating a new user
router.post("/register", RegisterService);
router.post("/login", LoginService);

export default router;
