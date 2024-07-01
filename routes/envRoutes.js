import express from "express";
import { createEnvService } from "../services/env/createEnvService.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createEnvService);

export default router;
