// contact.model.js
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String }, // Assuming emails should be unique
  phone: { type: String },
  mobile: { type: String },
  company: { type: String },
  position: { type: String }, // Job title or position in the company
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
  },
  notes: String, // Additional notes about the contact
  tags: [String], // Array of tags to categorize contacts
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  envId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Environment",
    required: true,
  },
  createdDate: { type: Date, default: Date.now },
  modifiedDate: { type: Date, default: Date.now },
});

// Middleware to update modifiedDate before saving
contactSchema.pre("save", function (next) {
  this.modifiedDate = Date.now();
  next();
});

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
