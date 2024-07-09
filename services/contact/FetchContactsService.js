import { fetchContactsController } from "../../controllers/contact/fetchContactsController.js";

export const FetchContactsService = async (req, res) => {
  try {
    const envId = req.user.envId;

    const contacts = await fetchContactsController(envId);

    res.status(200).json({
      success: true,
      message: "Contacts fetched successfully",
      data: contacts,
    });
  } catch (error) {
    console.error("Error in fetchContactsService:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};
