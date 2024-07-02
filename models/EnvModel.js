import mongoose, { Schema } from "mongoose";

const envSchema = new mongoose.Schema({
  envCode: { type: String, required: true, unique: true },
  envDescription: { type: String },
});

const Env = mongoose.model("Env", envSchema);

export default Env;
