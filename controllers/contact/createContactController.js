import Contact from "../../models/ContactModel.js";
import chalk from "chalk";

export const createContactController = async (contactData) => {
  const { contactName, phone, email, newEnvId, userId } = contactData;
  if (!contactName || (!phone && !email)) {
    // Check if either contactName, phone, or email is provided
    return {
      code: 106,
      err: true,
      msg: "The parameters contactName, phone, or email must be entered",
    };
  }

  try {
    // Check if a contact with the provided phone or email exists in the same environment
    const existingContact = await Contact.findOne({
      $or: [{ phone }, { email }],
      envId: newEnvId,
    });

    if (existingContact && existingContact.envId == newEnvId) {
      // If a contact exists, return its ID or another appropriate response
      console.log("existingContact ", existingContact.envId);
      return {
        code: 106,
        err: true,
        msg: "Contact with this phone or email already exists in this environment.",
      };
    }

    // If no contact exists, create a new one
    const newContact = new Contact({
      firstName: contactName,
      phone,
      email: email || "",
      mobile: contactData.mobile || "",
      envId: newEnvId,
      userId,
    });

    const savedContact = await newContact.save();
    return savedContact;
  } catch (error) {
    console.error(chalk.red.bold("Error creating contact:", error));
    return { err: true, msg: error.message };
  }
};
