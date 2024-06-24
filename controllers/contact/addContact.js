import Contact from "../../models/ContactModel.js";
import chalk from "chalk";

export const addContact = async (contactData) => {
  console.log(chalk.green(JSON.stringify(contactData)));
  if (!contactData?.firstName || !contactData?.email)
    return {
      code: 106,
      err: true,
      msg: "The parameters firstName&email must be entered",
    };
  try {
    const newContact = new Contact({
      firstName: contactData.firstName,
      lastName: contactData.lastName,
      email: contactData.email,
      userId: contactData.userId,
      mobile: contactData.mobile,
    });

    const savedContact = await newContact.save();
    return savedContact;
  } catch (error) {
    if (error.code === 11000 && error.keyPattern?.email === 1) {
      return {
        code: 101, // Or another appropriate code for duplicate email
        err: true,
        msg: "Duplicate contact. A contact with this email already exists.",
      };
    }
    console.error(chalk.red.bold("Error creating contact:", error)); // Log the error
    return { err: true, msg: error };
  }
};
