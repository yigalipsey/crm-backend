import Contact from "../../models/ContactModel.js";

export const deleteContactController = async (contactId) => {
  try {
    const deletedContact = await Contact.findOneAndDelete({
      _id: contactId,
    });

    if (!deletedContact) {
      return {
        err: true,
        msg: "Contact not found or you do not have permission to delete it",
      };
    }

    return deletedContact; // Return the deleted contact (optional)
  } catch (error) {
    console.error("Error deleting contact:", error);
    return {
      err: true,
      msg: "An unexpected error occurred while deleting the contact.",
    };
  }
};
