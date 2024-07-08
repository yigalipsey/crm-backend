import { createContactController } from "../../controllers/contact/createContactController.js";

export const CreateContactService = async (req, res) => {
  console.log("req.body", req.body);
  try {
    const contactData = {
      ...req.body,
      userId: req.user.userId,
      newEnvId: req.user.envId,
    };

    const response = await createContactController(contactData);

    if (response.err) {
      console.error("Error creating contact:", response.err);
      return res.status(400).json(response);
    } else {
      return res.status(201).json({
        success: true,
        message: "Contact created successfully",
        contactId: response._id,
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
