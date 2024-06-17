import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Store hashed and salted passwords
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  email: { type: String, required: false, unique: true },
  role: { type: String, enum: ["admin", "user"], default: "admin" },
  isActive: { type: Boolean, default: true },
  createdDate: { type: Date, default: Date.now },
  modifiedDate: { type: Date, default: Date.now },
});

// Middleware to update modifiedDate before saving
userSchema.pre("save", function (next) {
  this.modifiedDate = Date.now();
  next();
});

export const User = mongoose.model("User", userSchema);