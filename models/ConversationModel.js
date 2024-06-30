import mongoose, { Schema } from "mongoose";

const conversationSchema = new Schema({
  contactId: {
    type: Schema.Types.ObjectId,
    ref: "Contact",
    required: true,
  },
  fromId: { type: String, required: true },
  messages: [
    {
      metaId: { type: String, required: true, unique: true },
      inOut: { type: String, enum: ["IN", "OUT"], required: true },
      date: { type: Date, default: Date.now },
      type: { type: String, enum: ["Text", "Media"], required: true },
      content: { type: String, required: true },
      senderUserId: {
        type: Schema.Types.ObjectId, // Fixed import for ObjectId
        ref: "User",
      },
    },
  ],
});

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
