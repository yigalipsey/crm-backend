import { addContact } from "../../controllers/contact/addContact.js";

export const CreateContactService = async (req, res) => {
  try {
    const contactData = { ...req.body, userId: req.user.id }; // Get contact data from req.body and add userId
    // Call the controller function to create the contact
    const response = await createContact(contactData);

    // Check if contact creation was successful
    if (response && response.status === 201) {
      return res.status(201).json({
        success: true,
        message: "Contact created successfully",
        data: response.data, // Include the created contact in the response if needed
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Failed to create contact",
        error: response?.message || "Unknown error",
      });
    }
  } catch (error) {
    console.error("Error in createContactService:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
