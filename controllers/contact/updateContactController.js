import chalk from "chalk";
import Contact from "../../models/ContactModel.js";
import mongoose from "mongoose";

export const updateContactController = async (dataToUpdate, contactID) => {
  try {
    const contactToUpdate = await Contact.findOne({ _id: contactID });

    if (!contactToUpdate) {
      return {
        err: true,
        msg: "Contact not found or you do not have permission to update it",
      };
    }

    // Update the contact's fields using $set operator
    const updateQuery = { $set: {} };
    for (const key in dataToUpdate) {
      if (contactToUpdate.schema.path(key) && dataToUpdate[key] !== "") {
        updateQuery.$set[key] = dataToUpdate[key]; // Build update query with $set
      }
    }

    // Check if any fields were actually updated
    if (Object.keys(updateQuery.$set).length === 0) {
      return { err: true, msg: "No fields to update" };
    }

    // Update and validate in one step
    const updatedContact = await Contact.findByIdAndUpdate(
      contactID,
      updateQuery,
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return { err: true, msg: "Failed to update contact" };
    }

    return updatedContact;
  } catch (error) {
    console.error("Error updating contact:", error);

    if (error instanceof mongoose.Error.ValidationError) {
      const errorMessage = Object.values(error.errors)
        .map((err) => err.message)
        .join(", ");
      return { err: true, msg: `Validation error: ${errorMessage}` };
    } else {
      return {
        err: true,
        msg: "An unexpected error occurred while updating the contact.",
      };
    }
  }
};
