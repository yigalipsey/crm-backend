import chalk from "chalk";
import { updateContactController } from "../../controllers/contact/updateContactController.js";

export const UpdateContactService = async (req, res) => {
  try {
    // Extract the necessary information from the request
    const contactId = req.params.id; // Assuming the ID is passed as a URL parameter

    const updatedContactData = req.body; // Updated contact data from the request body
    console.log(chalk.yellow("------Update--------"));
    console.log(updatedContactData);
    console.log(chalk.yellow("------"));
    // Check if any fields are provided for update
    if (Object.keys(updatedContactData).length === 0) {
      return res.status(400).json({ msg: "You must send fields to update" });
    }

    // Call the controller to update the contact
    const updatedContact = await updateContactController(
      updatedContactData,
      contactId
    );

    // Handle the controller's response
    if (updatedContact.err) {
      // If the controller returned an error, send an error response
      return res.status(400).json(updatedContact);
    } else {
      // If successful, send the updated contact with a success message
      return res.status(200).json({
        msg: "Contact updated successfully",
        code: 100,
        updatedContact,
      });
    }
  } catch (error) {
    // Catch any unexpected errors and send a generic error response
    console.error("Error in UpdateContactService:", error);
    return res.status(500).json({ err: true, msg: "Internal server error" });
  }
};
