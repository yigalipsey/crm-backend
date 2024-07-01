import mongoose, { Schema } from "mongoose";

const envSchema = new mongoose.Schema({
  envCode: { type: String, required: true, unique: true },
  envDescription: { type: String },
  adminUserId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
});

const Env = mongoose.model("Env", envSchema);

export default Env;
