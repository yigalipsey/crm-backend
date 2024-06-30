import { createOrUpdateConversationController } from "../../controllers/conversation/createOrUpdateConversationController.js";

export const createOrUpdateConversationService = async (req, res) => {
  try {
    // Call the controller to create or update the conversation
    const updatedConversation = await createOrUpdateConversationController(
      req.body
    );
    if (!updatedConversation.err) {
      res.status(200).json({
        success: true,
        message: "Conversation created/updated successfully",
        conversation: updatedConversation,
      });
    } else {
      res.status(500).json({
        success: false,
        message: updatedConversation.msg || "Internal server error",
      });
    }
  } catch (error) {
    console.error("Error in createOrUpdateConversationService:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};
