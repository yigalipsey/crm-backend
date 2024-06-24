import { addContact } from "../../controllers/contact/addContact.js";

export const CreateContactService = async (req, res) => {
  // console.log(req.user);
  try {
    const contactData = { ...req.body, userId: req.user.userId };

    // Call the controller function
    const response = await addContact(contactData);
    if (!response?.err) {
      res.status(201).json({
        success: true,
        message: "Contact created successfully",
        data: response,
      });
    } else return res.status(401).json(response);
  } catch (error) {
    console.error("Error in createContactService:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
