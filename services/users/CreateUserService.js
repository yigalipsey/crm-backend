import { createUserController } from "../../controllers/users/createUserController.js";
import chalk from "chalk";

export const CreateUserService = async (req, res) => {
  console.log(chalk.blue(JSON.stringify(req.body, null, 2))); // 2 is for indentation

  try {
    // Check if the user is an admin
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ err: true, msg: "Unauthorized: Only admins can create users" });
    }

    // Extract user data from the request body
    const userData = req.body;

    // Call the controller to create the user
    const result = await createUserController(userData);

    // Handle the controller's response
    if (result.err) {
      return res.status(400).json(result); // Send error response
    } else {
      return res.status(201).json(result); // Send success response
    }
  } catch (error) {
    console.error("Error in createUserService:", error);
    res.status(500).json({ err: true, msg: error.message });
  }
};
