import Conversation from "../../models/ConversationModel.js";

export const deleteConversationController = async (contactId) => {
  try {
    const result = await Conversation.deleteOne({ contactId });

    if (result.deletedCount === 0) {
      throw new Error("Conversation not found");
    }

    // Return a success message
    return { success: true, message: "Conversation deleted successfully" };
  } catch (err) {
    console.error("Error deleting conversation:", err);
    throw err; // Re-throw the error to be handled by the service
  }
};
