import Contact from "../../models/ContactModel.js";

export const addContact = async (contactData) => {
  try {
    const newContact = new Contact(contactData);
    const savedContact = await newContact.save();
    return savedContact;
  } catch (error) {
    return { err: true, msg: error };
  }
};
