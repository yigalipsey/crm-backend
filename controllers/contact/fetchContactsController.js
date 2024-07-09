import Contact from "../../models/ContactModel.js";

export const fetchContactsController = async (envId) => {
  try {
    const contacts = await Contact.find({ envId });
    return contacts;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
};
