import express from "express";
import { createOrUpdateConversationService } from "../services/conversation/createOrUpdateConversationService.js";
import { DeleteConversationService } from "../services/conversation/DeleteConversationService.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

// Route for creating a new user
router.post("/create", authMiddleware, createOrUpdateConversationService);

router.delete("/delete/:contactId", authMiddleware, DeleteConversationService);

export default router;
