import { deleteUserController } from "../../controllers/users/deleteUserController.js";

export const DeleteUserService = async (req, res) => {
  try {
    // Check if the user is an admin
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ err: true, msg: "Unauthorized: Only admins can delete users" });
    }

    const userId = req.params.userId; // Assuming the user ID is in the URL parameter

    const result = await deleteUserController(userId);

    if (result.err) {
      return res.status(404).json(result); // Send 404 if user not found
    } else {
      return res.status(200).json(result); // Send success response with deleted user data
    }
  } catch (error) {
    console.error("Error in DeleteUserService:", error);
    res.status(500).json({ err: true, msg: error.message });
  }
};
