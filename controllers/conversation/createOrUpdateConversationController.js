import Conversation from "../../models/ConversationModel.js";
import mongoose from "mongoose";

export const createOrUpdateConversationController = async (data) => {
  try {
    const { contactId, fromId, messages } = data;

    // Check if contactId is provided and is a valid ObjectId
    if (!contactId || !mongoose.Types.ObjectId.isValid(contactId)) {
      return { err: true, msg: "Invalid contact ID" };
    }

    if (!fromId) {
      return { err: true, msg: "Sender phone number (fromId) is required" };
    }

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return {
        err: true,
        msg: "Messages array is required and cannot be empty",
      };
    }

    // Find the conversation by contactId
    let conversation = await Conversation.findOne({ contactId });

    if (!conversation) {
      // If the conversation doesn't exist, create a new one
      conversation = new Conversation({ contactId, fromId, messages });
    } else {
      // If the conversation exists, add the new messages to the array
      conversation.messages.push(...messages);
    }

    // Save the updated (or newly created) conversation
    const savedConversation = await conversation.save();

    return savedConversation; // Return the saved conversation
  } catch (err) {
    console.error("Error creating/updating conversation:", err);
    throw err; // Re-throw the error to be handled by the service
  }
};
