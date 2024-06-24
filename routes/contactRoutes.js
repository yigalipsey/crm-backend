import express from "express";
import { CreateContactService } from "../services/contact/CreateContactService.js";
import { SearchContactService } from "../services/contact/SearchContactService.js";
import { UpdateContactService } from "../services/contact/UpdateContactService.js";
import { DeleteContactService } from "../services/contact/DeleteContactService.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route for creating a new user
router.post("/createcontact", authMiddleware, CreateContactService);

router.get("/searchcontact", authMiddleware, SearchContactService);

router.patch("/updatecontact/:id", authMiddleware, UpdateContactService);

router.delete("/deletecontact/:id", authMiddleware, DeleteContactService);

export default router;
