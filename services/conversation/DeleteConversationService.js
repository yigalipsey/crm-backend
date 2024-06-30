import { deleteConversationController } from "../../controllers/conversation/deleteConversationController.js";
import mongoose from "mongoose";

export const DeleteConversationService = async (req, res) => {
  try {
    // Extract contactId from path parameters (req.params)
    const contactId = req.params.contactId;

    // Input validation
    if (!contactId || !mongoose.Types.ObjectId.isValid(contactId)) {
      return res.status(400).json({ err: true, msg: "Invalid contact ID" });
    }

    // Call the controller to delete the conversation
    const result = await deleteConversationController(contactId);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error in DeleteConversationService:", error);
    res.status(500).json({ err: true, msg: error.message });
  }
};
