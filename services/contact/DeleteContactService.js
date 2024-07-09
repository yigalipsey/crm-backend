import { deleteContactController } from "../../controllers/contact/deleteContactController.js";

export const DeleteContactService = async (req, res) => {
  console.log("jnjnjn");
  try {
    // Extract the necessary information from the request
    const contactId = req.params.id;
    const userId = req.user.userId;
    console.log(contactId, userId);
    // Call the controller to delete the contact
    const deletedContact = await deleteContactController(contactId, userId);

    if (deletedContact.err) {
      // If the controller returned an error, send an error response
      return res.status(400).json(deletedContact);
    } else {
      return res
        .status(200)
        .json({ msg: "Contact deleted successfully", code: 100 });
    }
  } catch (error) {
    console.error("Error in DeleteContactService:", error);
    return res.status(500).json({ err: true, msg: "Internal server error" });
  }
};
