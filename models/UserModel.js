import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  email: { type: String, required: false },
  envId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Env",
    required: true,
  },
  role: { type: String, enum: ["admin", "user", "master"], default: "user" },
  isActive: { type: Boolean, default: true },
  createdDate: { type: Date, default: Date.now },
  modifiedDate: { type: Date, default: Date.now },
});

// Middleware to update modifiedDate before saving
userSchema.pre("save", function (next) {
  this.modifiedDate = Date.now();
  next();
});

const User = mongoose.model("User", userSchema);

export default User; // Default export
