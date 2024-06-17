import express from "express";
import { CreateContactService } from "../services/contact/CreateContactService.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route for creating a new user
router.post("/createcontact", authMiddleware, CreateContactService);

export default router;
